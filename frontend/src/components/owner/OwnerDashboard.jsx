import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css"
import { TbReceipt2 } from "react-icons/tb";
import { logout } from "../../redux/userSlice";
import { clearShopData } from "../../redux/ownerSlice";
import OwnerItemCard from "../../components/owner/OwnerItemCard";
import useGetCurrentShop from "../../hooks/useGetCurrentShop";

import { FaUtensils } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const OwnerDashboard = () => {

    useGetCurrentShop();

    const { userData } = useSelector(state => state.user);
    const { shopData } = useSelector(state => state.owner);

    const [showInfo, setShowInfo] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        dispatch(clearShopData());
        navigate("/signin");
    };

    return (
        <div>

            {/* Navbar */}
            <div className='navbar'>


                <h1>Foody</h1>

                {shopData ? (
                    <button
                        className='add-item'
                        onClick={() => navigate("/add-food-item")}
                    >
                        <IoMdAdd size={20} />
                        Add Food Item
                    </button>
                ) : (
                    <button
                        className='add-item'
                        onClick={() => navigate("/add-shop")}
                    >
                        <IoMdAdd size={20} />
                        Add Shop
                    </button>
                )}

                <div className='orders'>
                    <TbReceipt2 size={20} />

                    <span>My Pending Orders</span>

                    <span className='order-count'>0</span>
                </div>

                <div className="user-wrapper">

                    <div
                        className='user'
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        {userData.name.slice(0, 1)}
                    </div>

                    {showInfo && (
                        <div className="logout-container">

                            <div className='logout-user'>
                                {userData.name}
                            </div>

                            <div
                                className='logout-button'
                                onClick={handleLogout}
                            >
                                Logout
                            </div>

                        </div>
                    )}

                </div>

            </div>


            {/* Welcome - BELOW NAVBAR */}
            {shopData && (
                <div className="welcome">

                    <h1>
                        <FaUtensils className="welcome-icon" />
                        Welcome to {userData.name}
                    </h1>

                    <div className="shop-card">
                        <button
                            className="edit-shop-btn"
                            onClick={() => navigate("/add-shop")}
                            title="Edit shop"
                        >
                            <FaPen size={14} />
                        </button>
                        <img
                            src={shopData.image}
                            alt={shopData.name}
                            className="shop-image"
                        />
                        <div className="shop-card-content">
                            <h1 className="shop-name">{shopData.name}</h1>
                            <p className="content">{shopData.city}</p>
                            <p className="content">{shopData.address}</p>
                            <p className="content"></p>
                        </div>
                    </div>
                    <div className="add-food-card">
                        <FaUtensils className="add-food-icon" />
                        <h2 className="add-food-title">Add Your Food Item</h2>
                        <p className="add-food-text">
                            Share your delicious creations with our customers by adding them to the menu.
                        </p>
                        <button
                            className="add-food-btn"
                            onClick={() => navigate("/add-item")}
                        >
                            Add Food
                        </button>
                    </div>
                    <OwnerItemCard shopId={shopData._id} />


                </div>
            )}

        </div>
    )
}

export default OwnerDashboard;