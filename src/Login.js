import React from 'react'
import { Button } from '@mui/material'
import "./Login.css"


function Login() {
  const signIn = () => {

  }  
  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH8Vv3aulcVHkefzOeMvltgdfPjFkKLz59Qg&usqp=CAU' alt=''/>
            <div className='login_text'>
                <h1>Sign in to whatsapp</h1>
            </div>

            <Button onClick={signIn}>
                signIn with Google
            </Button>
        </div>
    </div>
  )
}

export default Login