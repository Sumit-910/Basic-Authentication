import React, { useEffect, useState } from 'react';

const Home = () => {

  const [userName, setUserName] = useState();
  const [show, setShow] = useState(false);
  const userHome = async()=>{
    try {
      const res = await fetch('/getdata',{
        method: "GET",
        headers: {
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();
      setUserName(data.name);
      setShow(true);

    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(()=>{
    userHome();
  },[]);

  return (
    <>
    <div className='homeui'>
      <h5 style={{color:"#3f83bc"}}>Welcome</h5>
      <h1>{userName}</h1>
      <h2 style={{zIndex: 2}}>{show?"Happy to see you back":"We Are The Mern Developer"}</h2>
    <div className="leftc"></div>
    <div className="rightc"></div>
    </div>
    </>
  )
}

export default Home
