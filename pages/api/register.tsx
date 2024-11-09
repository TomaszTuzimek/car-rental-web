import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../actions/authAction";


export default async function handler(req : NextApiRequest , res: NextApiResponse) {

    if(req.method === 'POST'){
        const userData = req.body;
        const result = await registerUser(userData);

        if(result?.success === true){
            return res.status(200).json(result);
        }
        if(result?.success === false){
            return res.status(401).json({message: 'Unsuccess register'});
        }
        if(result?.success === false && result.data?.message){
            return res.status(401).json(result.data?.message);
        }
    }
    else{
        res.status(405).json({message: 'Error in request or methode not allowed'})
    }
}
