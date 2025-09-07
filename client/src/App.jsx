import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Home from './pages/Home';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Postview from './components/Postview.jsx';
import About from './pages/About.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/sign-in' element={<Signin/>}/>
     <Route path='/sign-up' element={<Signup/>}/>
  
<Route path='/dashboard' element={<Dashboard/>}/>
     
     <Route path='/create-post' element={<CreatePost/>}/>
     <Route path='/post/:slug' element={<Postview/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}
