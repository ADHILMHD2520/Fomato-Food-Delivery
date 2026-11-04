import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/userSlice";

import "./UserDashboard.css";

import { IoLocationSharp, IoSearch } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";

function UserNavbar() {
    const { userData, city } = useSelector((state) => state.user);

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
            <div className="navbar">

                {/* Logo */}
                <h1>Foody</h1>

                {/* Location + Search */}
                <div className="navbar-ii">

                    {/* Location */}
                    <div className="location">
                        <IoLocationSharp />
                        <p className="truncate">{city}</p>
                    </div>

                    {/* Search */}
                    <div className="search">
                        <IoSearch />
                        <input
                            type="text"
                            placeholder="Please Enter Your Food"
                        />
                    </div>

                </div>

                {/* Cart */}
                <div className="cart-icon">
                    <CiShoppingCart
                        size={25}
                        className="text-[#ff4d2d]"
                    />
                    <span className="cart-count">0</span>
                </div>

                {/* Orders */}
                <button className="orders">
                    My Orders
                </button>

                {/* User */}
                <div
                    className="user"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    {userData?.name?.slice(0, 1)}
                </div>

                {/* User Menu */}
                {showInfo && (
                    <div className="logout-container">

                        <div className="logout-user">
                            {userData?.name}
                        </div>

                        <div
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default UserNavbar;