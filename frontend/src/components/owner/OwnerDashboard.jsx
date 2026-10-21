import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./OwnerDashboard.css"
import { TbReceipt2 } from "react-icons/tb";

import { logout } from "../../redux/userSlice";


const OwnerDashboard = () => {
  const { userData } = useSelector(state => state.user);
  const [showInfo, setShowInfo] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {

    // Remove JWT token
    localStorage.removeItem("token");

    // Clear Redux user data
    dispatch(logout());

    // Go to signin page
    navigate("/signin");
  };

  return (
    <div>
      <div className='navbar'>
        <h1>Foody</h1>



        <button className='add-item'>
          <IoMdAdd size={20} className='text-[#ff4d2d]' />
          Add Food Item
        </button>

        <div className='orders'>
          <TbReceipt2 size={20}/>
          <span>My Pending Orders</span>
          <span className='order-count'>0</span>
        </div>


        <div className="user-wrapper">
          <div className='user' onClick={() => setShowInfo(!showInfo)}>
            {userData.name.slice(0, 1)}
          </div>
          {showInfo &&
            <div className="logout-container">

              <div className='logout-user '>
                {userData.name}
              </div>

              <div className='logout-button' onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard