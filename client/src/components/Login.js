import React, { useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

import { UserContext } from '../App';

const Login = () => {

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(e) =>{
    e.preventDefault();

    const res = await fetch('/signin',{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({email,password})
    });

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Login");
    }
    else{
      dispatch({type: "USER", payload:true});
      window.alert("Login Successful");
      navigate("/");
    }
    
  }

  return (
    <>
      <div className="container">
        <form className='slform' method='POST'>
          <h3>Login</h3>
          <div className="ele">
            <input type="text" name="email" placeholder='Email' autoComplete='off' value={email} onChange={(e)=>{return setEmail(e.target.value)}} />
          </div>
          <div className="ele">
            <input type="password" name="password" placeholder='Password' autoComplete='off' value={password} onChange={(e)=>{return setPassword(e.target.value)}} />
          </div>

          <div className="submitbtn">
            <input type="submit" value="Login" name='signup' className='slbtn' onClick={loginUser} />
          </div>
          
        </form>

        <Link to="/signup" >Sign Up</Link>
      </div>
    </>
  )
}

export default Login
