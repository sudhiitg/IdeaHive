import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.currentUser);
  return (
    currentUser ? <Outlet /> : <Navigate to='/sign-in' />
  )
}
