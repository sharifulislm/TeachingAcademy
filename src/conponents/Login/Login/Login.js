import React, { useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../Loading/Loading';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email,setEmail]=useState('');
const [password,setPassword]=useState('');

const navigate = useNavigate()
const location = useLocation();
let from = location.state?.from?.pathname || "/";

let HendelError;
const [sendPasswordResetEmail, sending, error1] = useSendPasswordResetEmail(
  auth
);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      if (error ||error1) {
        HendelError = <div>
            <p className='text-danger'>Error:{error?.message} {error1?.message}</p>
          </div>
        
      }
      if (loading || sending) {
        return( <Loading></Loading>)
       
      }
      if(user)
       {
        return (navigate(from, { replace: true }));
      }
     


      const Handelemail = event => {
        const email = event.target.value;
        setEmail(email);
      }
      const HendelPassword = event => {
          const password = event.target.value;
          setPassword(password);
      }
      
      const HandelLoginSubmit = event => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password)
      }

      

    return (
        <div className='submit-from mt-5'>
            <p className='text-center'>Sign in with your existing account</p>
            <div>
                <form onSubmit={HandelLoginSubmit} action="">
            <label for="fname">Email Address</label> <br/>
            <input onBlur={Handelemail} className='ps-2 pt-1 pb-1' type="text" name="" id="" placeholder='Email'/> <br/>
            <label for="lname">Password   <span className='forgot-password ps-1 mt-2 mb-2 m-0 p-0'>
              
              <button  onClick={async () => {
          if(email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
          }else{
            await sendPasswordResetEmail(email);
            toast('Please enter your email address');
          }
           }} className='forgot-btn'> Forgot your password?</button>
           
           </span></label> <br/>
           <input onBlur={HendelPassword} className='ps-2 pt-1 pb-1' type="Password" placeholder='Password' id='Password' /> <br/>
           <button className='login mt-3 '>SIGIN IN</button>
           <ToastContainer />
           <small className='OR text-center'>OR</small>
           <p text-dengar>{HendelError}</p>
           <p>Don't have an account? <Link to="/Signup"> Create Account</Link></p>
           </form>
                 
            </div>
            
        </div>
    );
};

export default Login;