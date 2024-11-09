import React from 'react'
import Card from '../../components/ui/Card'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import noUser from '../../public/lock.png'

export default function Profile() {

  let expirationDate = '';
  let expirationHour = '';
  const {data:session} = useSession();
  if(session?.expires){
    const date = new Date(session.expires)
    expirationDate = date.toLocaleDateString();
    expirationHour = date.toLocaleTimeString();
  }

  return ( 
      <Card>
        <div className='mx-6 mt-6 my-6'>
            { session 
                ? (<div className='flex'>
                          <div className='mt-5 w-1/4 flex flex-col justify-center items-center h-full'>
                                <h1 className='text-3xl'>Hi {session?.user?.name}</h1>
                                {session?.user?.image 
                                  ? (
                                      <Image 
                                          className='mt-6'
                                          src={session?.user?.image} 
                                          alt={session?.user?.name || 'User without name'} 
                                          width={80}
                                          height={80}
                                      />
                                    ) 
                                  : (
                                      <Image 
                                          src={noUser} 
                                          alt="noUser" 
                                          width={80}
                                          height={80}
                                      />
                                    )
                                }
                                <div className='mt-7'>
                                      <button 
                                        className='bg-red-900 text-xl mt-5 px-4 py-2 mb-8 text-white rounded-lg' 
                                        onClick={()=> signOut({callbackUrl:'/'})}
                                      >
                                        Sign out
                                      </button>
                                </div>
                          </div>
                        <div className='w-3/4 flex'>

                        <div className='ml-7 flex flex-col justify-center items-center h-full'>
                              <h1>You are registered as: </h1>
                              <p>{session?.user?.email}</p>
                          </div>
                          <div className='ml-7 flex flex-col justify-center items-center h-full'>
                                <h1>Your session expires in:</h1>
                                <p>day:  {expirationDate}</p>
                                <p>hour: {expirationHour}</p>
                          </div>
                        </div>
                  </div>)   
                : (<div>
                      <p className='font-semibold text-2xl'>Hi new user! </p>
                      <h1>You are not registered or logged</h1>
                      <h1>Please register Yourself here: <Link className='font-semibold' href='/auth/register'>register</Link></h1>
                      <h1>or login here: <Link className='font-semibold' href='/auth/login'>login</Link></h1>
                  </div>)
            }     
        </div>
      </Card>
  )
}
