import { DatePicker } from '@nextui-org/react';
import { useSession } from 'next-auth/react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import React from 'react'

export default function NewRent() {

     const {data:session} = useSession()
    //const isAdmin = session?.user?.name;
    function handleDateChange(){
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          label='start' 
          name='start'
          onChange={handleDateChange} 
        />
        <DatePicker 
          label='end' 
          name='end' 
        />
    </LocalizationProvider>
  )
}
