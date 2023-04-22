import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const About = () => {

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const callAboutPage = async()=>{
    try {
      const res = await fetch('/about',{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type" : "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      if(res.status !== 200){
        const error = new Error(res.error);
        throw error;
      }
      setUserData(data);

    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }
  
  useEffect(()=>{
    callAboutPage();
  },[]);

  return (
    <>
      <div className="aboutpage">
        <div className="elea">
          <span className='aspan'>user Id</span> : {userData._id}
        </div>
        <div className="elea">
          <span className='aspan'>Name</span>: {userData.name}
        </div>
        <div className="elea">
          <span className='aspan'>Email</span>: {userData.email}
        </div>
        <div className="elea">
          <span className='aspan'>Phone</span>: {userData.phone}
        </div>
        <div className="elea">
          <span className='aspan'>Profession</span>: {userData.work}
        </div>
      </div>
    </>
  )
}

export default About
