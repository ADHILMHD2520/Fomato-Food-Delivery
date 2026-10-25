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
import useGetCurrentShop from './hooks/useGetCurrentShop';
import CreateShop from './pages/Shop/CreateShop';
import AddItem from './pages/Shop/AddItem';
import EditItem from "./pages/Shop/EditItem";

function App() {
  const {userData}=useSelector((state) => state.user);

  useCurrentUser();
  useGetCity();
  useGetCurrentShop();
  return (
    <>
      <Routes>
        <Route path="/signin" element={!userData ? <Signin /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/" />} />
        <Route path="/forgot" element={<ForgotPassword />} />


        <Route path="/add-shop" element={<CreateShop />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/edit-item/:itemId" element={<EditItem />} />



        <Route path="/" element={<Home />} />


        <Route path="/user" element={<UserDashboard />} />


      </Routes>
    </>
  )
}

export default App
