import { usePathname } from 'next/navigation'
import React from 'react'

export default function SetPasswordForExistingUser() {
  
  const path = usePathname()

  if(path === '/auth/restorePassword'){

    return (<div>
        restore form
    </div>)
  }else{ 
    return (
        <div>
          Path: {path}
        </div>
  )}
}
