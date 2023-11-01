
import './App.css';

import React from 'react'
import {useState} from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Header from './components/Header/Header';
import Login from './components/Login/Login';


const App = () => {
  
  const[isAdmin,setisAdmin] = useState(false)
  const[loggedIn,setLoggedIn] = useState(false)

  const handleChange = (value)=>{
    alert("Chamou")
    navigate('/dahboard')
    setLoggedIn(true);
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home handleChange={handleChange}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
          {loggedIn && (<Route path='/dashboard' element={<Dashboard />} />)}
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App