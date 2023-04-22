import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [userData, setUserData] = useState({
    name:"", email:"",phone:"",msg:""
  });
  const userContact = async()=>{
    try {
      const res = await fetch('/getdata',{
        method: "GET",
        headers: {
          "Content-Type" : "application/json"
        }
      });

      const data = await res.json();
      if(res.status !== 200){
        const error = new Error(res.error);
        throw error;
      }
      setUserData({...userData, name: data.name, email: data.email, phone: data.phone});

    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(()=>{
    userContact();
  },[]);

  const handleInputs = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setUserData({...userData,[name]:value});
  }

  const handleContact = async(e) =>{
    e.preventDefault();

    const {name, email, phone, msg} = userData;

    const res = await fetch('/contact',{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({name,email,phone,msg})
    });

    const data = await res.json();

    if(!data){
      console.log("message not send");
    }
    else{
      alert("message sent");
      setUserData({...userData, msg: ""});
    }
  }

  return (
    <>
      <div className="totalup">
        <div className="cardup">
          Email<br />{userData.email}
        </div>
        <div className="cardup">
            Phone<br />{userData.phone}
        </div>
        <div className="cardup">
          Address<br />hehe
        </div>
      </div>

      <div className="totaldown">
      <div className="container">
        <form className='slform' method='POST' >
          <h3>Get In Touch</h3>

          <div className="ele">
            <input type="text" name="name" placeholder='Name' autoComplete='off' value={userData.name} onChange={handleInputs} />
          </div>
          <div className="ele">
            <input type="text" name="email" placeholder='Email' autoComplete='off' value={userData.email} onChange={handleInputs} />
          </div>
          <div className="ele">
            <input type="text" name="phone" placeholder='Phone' autoComplete='off' value={userData.phone} onChange={handleInputs} />
          </div>

          <textarea className="textarea" placeholder='Message' name='msg' cols='50' rows="10" value={userData.msg} onChange={handleInputs} ></textarea>

          <div className="submitbtn">
            <button type="submit" className='slbtn' onClick={handleContact} >Send Message</button>
          </div>
          
        </form>
      </div>
      </div>
    </>
  )
}

export default Contact
