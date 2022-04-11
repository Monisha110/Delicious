import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from "react";
import Login from "./login";
import Register from "./register.js";
import Navbar from "./navbar";
import Recipes from "./recipes";
import Form from "./createrecipe";

const App = () =>
{
    return (<div>
        <BrowserRouter>
            <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/" exact element={<Navbar text="Login"/>} />
            <Route path="/recipes" exact element={<Recipes />} />
            <Route path="/createrecipe" exact element={<Form />} />
            </Routes>
        </BrowserRouter>

    </div>)
}

export default App;
