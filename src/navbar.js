import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

export default function Navbar(prop) {
    let navigate = useNavigate();
   function handle(e){
     if(e.target.text==="Login"){
    const path="login";
    navigate(path)
  }
    else
    {
      localStorage.removeItem('token')
      navigate("../login")
      // alert("successfully loggged out")
    }
    }

    function create(){
      navigate("../createrecipe")
      }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rentle
          </Typography>
          <Button color="inherit" onClick={create}>Create</Button>
          
          <Button color="inherit" onClick={handle}>{prop.text}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
