import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma-client";

export default async function loginHandler(req : NextApiRequest , res: NextApiResponse) {

    if(req.method === 'POST'){
        const userData = req.body
        const user = await prisma.user.findUnique({where: {email: userData.email}})

        if(user){
            return res.status(200).json({id:user.id});
        }else{
            return res.status(401).json({message: 'Email not found in repo'});  
        }
    }    else{
            return res.status(405).json({message: 'Error in request or method. Not allowed'})
    }


}