import { authSchema, type AuthSchema } from "../../components/model/authSchema";
import { RegisterSchema, registerSchema } from "../../components/model/registerSchema";
import bcrypt from 'bcryptjs'

import { v4 as uuid } from "uuid";
import type RegisterMongo from "../../components/model/registerMongo";
import { prisma } from "../../lib/prisma-client";
import { Prisma } from "@prisma/client";


export async function registerUser(data: RegisterSchema){
    const validatedData = registerSchema.safeParse(data);

    if(!validatedData.success){
        return {
            success: false,
            error: validatedData.error,
            data : validatedData.data
        }
    }
    const {name, password, email} = validatedData.data;

    const newUserData: RegisterMongo = {
        id: uuid(),
        name: name,
        password: await bcrypt.hash(password, 8),
        email: email,
    }
    try {    
        const createdUser = await prisma.user.create({
                                                        data : {
                                                                    ...newUserData 
                                                                }
        });
        return{
            success : true,
            data: {createdUser}
        }
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                return{
                    success : false,
                    data: {message: 'User already registered!'}
                }
            }else{
                return{
                    success : false,
                    data: {message: 'Something went wrong.'}
                }    
            }
        }
    }
}

export async function authUser(data: AuthSchema){
    const validatedData = authSchema.safeParse(data);
    if(!validatedData.success){
        return {
            success: false,
            error: validatedData.error,
            data : validatedData.data
        }
    }

    const {email, password} = validatedData.data;
    const user = await prisma.user.findUnique({where: {email}})
    if(!user){
        return{
            success : false,
            auth: false,
            data: {message: "User not found"},
        }
    }
    const passwordMatch = await bcrypt.compare(password, user.password as string)
    if(!passwordMatch){
        return{
            success : false,
            auth: false,
            data: {message: "Password not match"},
        }     
    }
    return{
        success : true,
        auth: true,
        data: {message: "User logged", token: "tokenForApi"},
    }
}
export async function getUserByEmail(email : string) {
    return prisma.user.findUnique({where: {email}});
}
export async function setPasswordIfIsEmpty(email: string, password:string){
}

