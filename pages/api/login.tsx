import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthSchema } from "../../components/model/authSchema";
import bcryptjs from 'bcryptjs'
import { prisma } from "../../lib/prisma-client";

export default async function loginHandler(req : NextApiRequest , res: NextApiResponse) {

    if(req.method === 'POST'){
        const userData: AuthSchema = req.body;

        const userFromPrisma = await prisma.user.findUnique({where: {email: userData.email}})
       
        if(userFromPrisma){
            const result = await bcryptjs.compare(userData.password, userFromPrisma.password as string);

            if (!result) return res.status(401).json({message: 'Password not match'});

            return res.status(200).json(userFromPrisma.email);
        }else{
            return res.status(401).json({message: 'Email not found'});   
        }
    }
    else{
        res.status(405).json({message: 'Error in request or method. Not allowed'})
    }
    
}
