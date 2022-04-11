import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

import React from 'react';
import './login.css';

import {useState} from 'react';
import { useNavigate } from "react-router-dom";
function Login() {

  
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const navigate=useNavigate();
  async function handleSubmit(event)
  {
    event.preventDefault();
    console.log("jjj");
    const response =await fetch("http://localhost:1337/api/login" , 
      {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
          body : JSON.stringify(
          {
            email,
            password,
          }),
      })
    const data = await response.json();
    if(data.user){
     localStorage.setItem('token',data.user)
      // window.alert("login successfull")
      // window.location.href='/dashboard';
      navigate("../recipes");
      console.log("dd");
    }
    else
    {
      alert("incorrect username or password")
    }
    console.log(data);
  }

  return <>
   <div className="element1"></div>
   <div className="element">
   <div className="login">
     <h3>
     Login
     </h3>
     <br />

     <form onSubmit={handleSubmit}>
       {/* <label htmlFor='email' >Email :</label> */}
       <Input type="text" 
       name="email" 
       value={email} 
       placeholder="Enter email"
       onChange={(e)=>setEmail(e.target.value)} 
       />
<br /><br />
       {/* <label htmlFor='password' >Password :</label> */}
       <Input type="password" 
       name="password" 
       value={password} 
       placeholder="Password"
       onChange={(e)=>setPassword(e.target.value)} />
<br /><br />
      <div className="button"><Button type="submit" variant="contained" >Login</Button></div> 
      
     </form>
     </div>
     </div>
     </>
    
  
}

export default Login;
