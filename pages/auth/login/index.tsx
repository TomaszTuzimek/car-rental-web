'use client'
import {signIn} from "next-auth/react"
import { useRef, useState, type FC } from "react";
import { useRouter } from "next/router";
import Card from "../../../components/ui/Card";
import { authSchema, type AuthSchema } from "../../../components/model/authSchema";
import { GithubSignInButton, GoogleSignInButton } from "../../../components/authButtons";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

const LogIn: FC = ()=>{
    const router = useRouter();
    const [userData, setUserData] = useState({email: '', password: ''});
    const [errors, setErrors] = useState<{name? : string , email?: string, password?: string}>({});

    const handleSubmit = async (event: React.FormEvent)=>{
        event.preventDefault();
        const {email, password} = userData;

        const user : AuthSchema = {
            email: email,
            password: password
        }

        const validationResult = authSchema.safeParse(user);

        if(!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0]
            });
            return;
        }
        setErrors({});

        const signInResponse = await signIn('credentials',{
                email: user.email,
                password: user.password,
                redirect: false,
                callbackUrl:'/',
        });

        if(signInResponse && !signInResponse.error){
            console.log('Credentials accepted.');
            console.log ('registered user : ' + user.email);
            router.push("/");
        }else{
            console.log("Email or password not correct")
            console.log(signInResponse?.status)
            setErrors({email: "Email or password not correct"})
        }
    }
    const hasErrors = Object.keys(errors).length > 0;
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })


        setErrors({});
    };

    return (
                <Card >
                
                <div className="mx-5">
                    <p className="flex justify-center items-center text-3xl mb-10 text-red-900 font-bold">Sign In</p>
                    <GoogleSignInButton />
                    <GithubSignInButton />
                </div>


                    <form onSubmit={handleSubmit} className="mx-5">
                    
                        <div  className="flex justify-center mt-11">
                            <label className="flex text-3xl text-center mb-10 text-red-900 font-bold">or</label>
                        </div>
                        <div  className="flex items-center gap-4 mb-4">
                            <TextField
                                id="outlined-email-input"
                                name="email"
                                label="Email"
                                type="email"
                                autoComplete="current-email"
                                value= {userData.email}
                                onChange={handleInputChange}
                                fullWidth
                            />     
                            {errors.email && <p className="text-red-600">{errors.email}</p>} 
                        </div>
                        <div  className="flex items-center gap-4 mb-4">
                            <TextField
                                id="outlined-password-input"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value= {userData.password}
                                onChange={handleInputChange}
                                fullWidth
                            /> 
                            {errors.password && <p className="text-red-600">{errors.password}</p>}    
                        </div>
                        <div>
                            <p className="text-right -mt-2">Can't rememeber password?  
                                <Link  
                                    href={'/auth/restorePassword'}
                                    className="font-semibold ml-2"
                                >
                                        Click here
                                </Link>
                            </p>
                        </div>
                        <div className="h-5">
                        </div>
                        <div className="flex justify-center items-center">
                        <Button 
                            variant="contained" 
                            type="submit"
                            size="large"
                            endIcon={<Send />}
                            sx={{
                                backgroundColor: '#3d3d3d',
                                color: '#fff',               
                                '&:hover': {
                                    backgroundColor: '#706f6f',
                                },
                            }}
                        >
                            Send
                        </Button>
                            
                        </div>
                        <div className="h-5">
                        </div>
                                    
                    </form>
                </Card>
    )
}
export default LogIn;