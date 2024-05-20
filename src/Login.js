import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();
    }
    const register = e => {
        e.preventDefault();
    }

  return (
    <div className='login'>
        <Link to='/'>
            <img className='login_logo' src='https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg'/>
        </Link>
        <div className='login_container'>
            <h1>Sign_In</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                <h5> Password </h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>


                <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>
            </form>

            <p>
            By continuing, you agree to AMAZONS FAKE CLONE Conditions of Use and Privacy Notice.
            </p>
            
            <button onClick={register} className='login_registerButton'>Create Your Amazon Account</button>

        </div> 
    </div>
  )
}

export default Login
