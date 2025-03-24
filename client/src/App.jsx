import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Home from './pages/Home';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/sign-in' element={<Signin/>}/>
     <Route path='/sign-up' element={<Signup/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}
