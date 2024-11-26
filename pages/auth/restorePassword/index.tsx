'use client'
import React from 'react'
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useState } from 'react';
import { emailSchema } from '../../../components/model/emailSchema';
import { useRouter } from 'next/router';

export default function PasswordRestore() {
    const router = useRouter();
    const [error, setError] = useState<{email? : string}>({})
    const [inputData, setInputData] = useState<{email? : string}>({})

    async function handleSubmit(event: React.FormEvent ){
        event.preventDefault();
        const validationResult = emailSchema.safeParse(inputData)
        if(!validationResult.success){
            const fieldError = validationResult.error.flatten().fieldErrors;
            setError({
                email: fieldError.email?.[0]
            });
            console.log(error.email)
            return;
        }else{
            setError({});
        }

            try{
                
                if(typeof inputData.email === 'string'){
                    const response = await fetch ('/api/auth/find-user',{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({email: inputData.email})
                    }) 
                    const responseBody = await response.json();
                    if(response.ok){
                        if(responseBody?.id){
                            router.push(`/auth/${responseBody.id}`);
                            console.log(`/auth/${responseBody.id}`);   
                        }
                    }else{
                        setError({email: responseBody.message || "wrong email"})
                    }
                }
            } catch (err) {
                // Handle network or server errors
                console.error("Network or server error:", err);
                setError({ email: "Failed to connect to the server. Please try again later." });
            }
    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setInputData({[event.target.name] : event.target.value})
        setError({});
    }
    const hasError = Object.keys(error).length > 0;
  
    return (
        <Box
            component="form"
                sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            className='flex flex-col'
            >
            <div className='flex flex-col'>
            <p className=''>Please input Your email to send password reset email</p>
            </div>
            <TextField 
                id="outlined-basic"
                name="email"
                label="Email" 
                variant="outlined"
                onChange={handleInputChange}
                value={inputData.email}
                helperText={error.email || ''}
            /> 
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
                        disabled={hasError}
            >
                Send
            </Button>
        </Box>
  )
}
