
import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
function CreateNote()
{
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
  const navigate=useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const res=await fetch("http://localhost:1337/api/createrecipe" ,
        {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
              'x-access-token':localStorage.getItem('token'),
            },
              body : JSON.stringify(
              {
                title,content
              }),

        });
        const data=await res.json();
        console.log(data)
        navigate("../recipes")
    }
   
    return <>
      <form >
         <h2>Title</h2> <input type="text" 
         onChange={(e)=> setTitle(e.target.value) }
         value={title}
         name="title"></input>

         <br />
         <h2>Content</h2> <input type="text" 
         onChange={(e)=> setContent(e.target.value) }
         value={content}
         name="content"></input>
         <input type="submit" onClick={handleSubmit}></input>

      </form>
     
    </>
}

export default CreateNote;