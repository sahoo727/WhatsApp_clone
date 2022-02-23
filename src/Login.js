import React from 'react'
import { Button } from '@mui/material'
import "./Login.css"
import {auth,provider} from './firebase'
import { useStateValue } from './SateProvider'
import { actionTypes } from './reducer'


function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
    .signInWithPopup(provider)
    .then((result)=> {
        dispatch({
        type : actionTypes.SET_USER,
        user : result.user,
      })
    })
    .catch((error) => alert(error.message));
  };
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