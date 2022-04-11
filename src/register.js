import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import React from 'react';
import './register.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

function Register() {
// const history=useNavigate()
  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  let navigate = useNavigate();

  async function handleSubmit(event)
  {
    event.preventDefault();
    console.log("jjj");
    const response =await fetch("http://localhost:1337/api/register" , 
      {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
          body : JSON.stringify(
          {
            name,
            email,
            password,
          }),
      })
    const data = await response.json();
    console.log(data);
    const path="../recipes";
    navigate(path)
  }

  return <>
  <div className="element1"></div>
   <div className="element">
   <div className="register">
     <h3>
      Register
     </h3>
     <br />

     <form onSubmit={handleSubmit}>
       <label htmlFor='name' >Name :</label>
       <Input type="text"
       
        name="name" 
        value={name} 
        onChange={(e)=>setName(e.target.value)} 
        />
<br /><br />
       <label htmlFor='email' >Email :</label>
       <Input type="text" 
       
       name="email" 
       value={email} 
       onChange={(e)=>setEmail(e.target.value)} 
       />
<br /><br />
       <label htmlFor='password' >Password :</label>
       <Input type="password"
        
       name="password" 
       value={password} 
       onChange={(e)=>setPassword(e.target.value)} />
<br /><br />
       <Button type="submit" variant="contained" >Submit</Button>
     </form>
     </div>
     </div>
     </>
    
  
}

export default Register;
