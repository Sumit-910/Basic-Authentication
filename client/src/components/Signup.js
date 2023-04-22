import React, { useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });

  let name,value;

  const handleInput=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value});
  }

  const postData = async(e) =>{
    e.preventDefault();

    const {name,email,phone,work,password,cpassword} = user;

    const res = await fetch("/register",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({name,email,phone,work,password,cpassword})
    });

    const data = await res.json();

    if(data.status === 422 || !data){
      window.alert("Invalid Registration");
    }
    else{
      window.alert("Registration Successful");
      navigate("/login");
    }

  }

  return (
    <>
      <div className="container">
        <form className='slform' method='POST' >
          <h3>Sign Up</h3>
          <div className="ele">
            <input type="text" name="name" autoComplete='off' value={user.name} onChange={handleInput} placeholder='Name' />
          </div>
          <div className="ele">
            <input type="text" name="email" autoComplete='off' value={user.email} onChange={handleInput} placeholder='Email' />
          </div>
          <div className="ele">
            <input type="number" name="phone" autoComplete='off' value={user.phone} onChange={handleInput} placeholder='Phone' />
          </div>
          <div className="ele">
            <input type="text" name="work" autoComplete='off' value={user.work} onChange={handleInput} placeholder='Work' />
          </div>
          <div className="ele">
            <input type="password" name="password" autoComplete='off' value={user.password} onChange={handleInput} placeholder='Password' />
          </div>
          <div className="ele">
            <input type="password" name="cpassword" autoComplete='off' value={user.cpassword} onChange={handleInput} placeholder='Confirm Password' />
          </div>

          <div className="submitbtn">
            <input type="submit" value="Sign Up" name='signup' className='slbtn' onClick={postData} />
          </div>
          
        </form>

        <Link to="/login" >Login</Link>
      </div>
    </>
  )
}

export default Signup
