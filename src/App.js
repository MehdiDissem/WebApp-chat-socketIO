import logo from './logo.svg';
import './App.css';
import { Context } from "./Context";
import Chat from "./components/Chat"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './components/Register';

import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  const [users, setUsers]=useState([])

  useEffect(()=>{
    axios.get("http://127.0.0.1:3000/api/users/all").then(res=> setUsers(res.data)).catch(err=>console.log(err))
  },[])
console.log(users, "from app")

  return (
    <Context.Provider 
    value ={{users}}>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register/>}/>
        <Route exact path="/chat" element= {<Chat data={users}/>}/>
      </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
