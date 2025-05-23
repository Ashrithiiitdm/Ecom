import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import axios from '../../axios.js';
import { toast } from 'react-toastify'; 

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const onSubmitHandler = async (event)=>{
    event.preventDefault();

    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post('/api/users/register', {name, email, password});
        
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }

        else{
          toast.error(response.data.message);
        }

      }

      else{
        const response = await axios.post('/api/users/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        
        else{
          toast.error(response.data.message);
        }

      }

    }

    catch(err){
      console.log(err);
      toast.error(err.message);
    }

  };

  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token]); 

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name}  type='text' required className='w-full px-3 py-2 border border-gray-800' placeholder='Name' /> }
      <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' required className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' required className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password</p>
        {
          currentState === 'Login'
          ? <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>
            Create Account
          </p>
          :
          <p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState == 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login
