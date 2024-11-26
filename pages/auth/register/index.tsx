'use client'
import { useState, type FC } from "react";
import { useRouter } from "next/router";
import Card from "../../../components/ui/Card";
import { registerSchema, type RegisterSchema } from '../../../components/model/registerSchema';
import { signIn } from "next-auth/react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";

const RegisterNewUser: FC = ()=>{

    const router = useRouter()
    const [formData, setFormData] = useState({name: 'Test', email: '', password: ''})

    const [errors, setErrors] = useState<{name? : string , email?: string, password?: string}>({});

    const handleSubmit = async (event: React.FormEvent)=>{
        event.preventDefault();

        const user : RegisterSchema = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        const validationResult = registerSchema.safeParse(user);

        if(!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0]
            });
            return;
        }

        setErrors({});

        const response = await fetch( '/api/register',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user),
        });

        if(response.status === 200){

            const signInResponse = await signIn("credentials", {
                                                                    email: user.email,
                                                                    password: user.password,
                                                                    redirect:false,
                                                                    callbackUrl: '/',
                                                                })
            if(signInResponse?.ok){
                router.push('/');
            }else {
                console.error('Error logging in after registration');
            }                                                  
            
        }else if(response.status === 401){
            setErrors({email: 'Email already registered'})
        }else{
            console.error("Error registering user");
        }  
    }
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
                    ...formData,
                    [event.target.name] : event.target.value
         });
        setErrors({});
    };
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <Card>
            <form onSubmit={handleSubmit} className="mx-5">
            
                <div  className="mt-5 my-6">
                    <label className="text-3xl mb-10 text-gray-800 font-bold">Please register Yourself</label>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <TextField
                        id="outlined-input"
                        name="name"
                        label="Name"
                        autoComplete="current-name"
                        value= {formData.name}
                        onChange={handleInputChange}
                        fullWidth
                    />  
                    {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>
                <div  className="flex items-center gap-4 mb-4">
                    <TextField
                        id="outlined-email-input"
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete="current-email"
                        value= {formData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />     
                    {errors.email && <p className="text-red-600">{errors.email}</p>}
                </div>
                <div  className="flex items-center gap-4">
                    <TextField
                        id="outlined-password-input"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value= {formData.password}
                        onChange={handleInputChange}
                        fullWidth
                    />  
                    {errors.password && <p className="text-red-600">{errors.password}</p>}   
                </div>
                <div className="flex h-10 mt-5 justify-center items-center">
                <Button 
                    variant="contained" 
                    type="submit"
                    disabled={hasErrors}
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
                <div className="h-5"></div>
                        
            </form>
        </Card>
    )
}
export default RegisterNewUser;
