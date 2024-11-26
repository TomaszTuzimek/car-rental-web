import React from 'react';
import NewCarForm from "../../components/cars/NewCarForm.js";
import Head from 'next/head.js';
import { useSession } from 'next-auth/react';

import Link from 'next/link.js';

export default function NewCar() {
  const {data:session, status } = useSession();

  return (
          <>
              <Head>
                            <title>Add new car</title>
                            <meta name='description' content='New amazing car' />
              </Head>
              {status === 'loading' && <p>Loading...</p>}
              {session ? (<div>
                            <NewCarForm />
                          </div>)
                        :
                          (<div>
                            <p>You dont have premission to add new Car</p>
                            <p>Please <Link className='font-semibold' href="/login">log in</Link> to continue.</p>
                          </div>)
            }
          </>  
  )
}
