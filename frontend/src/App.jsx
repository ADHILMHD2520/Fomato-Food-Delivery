import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";


import Signin from './pages/authentication/Signin'
import Signup from './pages/authentication/Signup'
import ForgotPassword from './pages/authentication/ForgotPassword'
import useCurrentUser from './hooks/useCurrentUser'
import Home from './pages/Home/Home'
import UserDashboard from './components/user/UserDashboard'
import useGetCity from './hooks/useGetCity'
import { useSelector } from 'react-redux'

function App() {
  const {userData}=useSelector((state) => state.user);

  useCurrentUser();
  useGetCity();
  return (
    <>
      <Routes>
        <Route path="/signin" element={!userData ? <Signin /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/" />} />
        <Route path="/forgot" element={<ForgotPassword />} />


        <Route path="/" element={<Home />} />


        <Route path="/user" element={<UserDashboard />} />


      </Routes>
    </>
  )
}

export default App
