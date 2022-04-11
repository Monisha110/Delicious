import React from 'react';
//import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Navbar from "./navbar";
import {useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';


const Notes = () =>
{
  const [quote,setQuote]=useState(0);
  const [recipes,setRecipes]=useState([{}])
  async function handle(){
    const res=await fetch('http://localhost:1337/api/recipes',
    {
      headers:{
             'x-access-token':localStorage.getItem('token'),
                }
    })
    const data=await res.json()
    console.log(data)
    
    if (data.status === 'ok') {
			setQuote(data.quote)
      setRecipes(data.recipes)
		} else {
			alert(data.error)
		}
  }

 

  useEffect(()=>
  {
    handle(); 
  },[])
  return <>
  <Navbar text="Logout"/>
  {quote && 
    <div>
      {
        recipes.map((recipe)=>
        {
          return <>
          <Note key={recipe._id} onerecipe={recipe}/>
          </>
        })
      }
    </div>
  }
  
  
  </>
}

const Note=(prop)=>{
 const navigate=useNavigate()
  async function handledelete(id){
    const res=await fetch('http://localhost:1337/api/delete',
    {
      method:'DELETE',
      headers:{
        'x-access-token':localStorage.getItem('token'),
            'Content-type' : 'application/json'
                },
      body : JSON.stringify({
       id:id
      })
    })
    const data=await res.json()
    console.log(data)
    navigate("../recipes")
  }

  return <>

  <br />
  <Card sx={{ maxWidth: 500}}>
  <CardContent>
  <h1>{prop.onerecipe.title}</h1>
  <p>{prop.onerecipe.content}</p>
  
  <Button variant="outlined" size="small" onClick={()=> {handledelete(prop.onerecipe._id)} }>Delete</Button>
  </CardContent>
  </Card>
  <br />
  
  </>
}
export default Notes;