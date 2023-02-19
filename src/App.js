import logo from './logo.svg';
import './App.css';
import { Context } from "./Context";
import Chat from "./components/Chat"
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers]=useState([])

  useEffect(()=>{
    axios.get("http://127.0.0.1:3000/api/users/all").then(res=> setUsers(res.data)).catch(err=>console.log(err))
  },[])
console.log(users, "from app")

  return (
    <Context.Provider 
    value ={{users}}>
      <Chat data={users}/>
    </Context.Provider>
  );
}

export default App;
