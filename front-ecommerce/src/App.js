
import './App.css';

import React from 'react'
import {useState} from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


const App = () => {
  const[isAdmin,setisAdmin] = useState(false)
  const[loggedIn,setLoggedIn] = useState(false)

  const handleChange = (value)=>{
    setLoggedIn(value);
  }
  return (
    <div className='App'>
      <button onClick={()=>setLoggedIn(true)}>clique</button>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home handleChange={handleChange}/>} />
          <Route path="/login" element={loggedIn ? <redirect to="/dashboard" /> : <Home />}/>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App