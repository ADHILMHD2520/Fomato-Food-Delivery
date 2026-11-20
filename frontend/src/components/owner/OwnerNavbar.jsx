
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaBell,
    FaChevronDown,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";

import { TbReceipt2 } from "react-icons/tb";

import { logout } from "../../redux/userSlice";
import { clearShopData } from "../../redux/ownerSlice";

import "./OwnerNavbar.css";

const OwnerNavbar = () => {

    const { userData } = useSelector(state => state.user);

    const [showProfile, setShowProfile] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {

        localStorage.removeItem("token");

        dispatch(logout());
        dispatch(clearShopData());

        navigate("/signin");
    };

    return (
        <header className="owner-navbar">
            {/* LEFT SECTION */}
            <div className="owner-navbar-left">
                <h2>Restaurant Dashboard</h2>
                {/* <p>Manage your restaurant</p> */}
            </div>


            {/* RIGHT SECTION */}
            <div className="owner-navbar-right">

                {/* NOTIFICATION */}
                <button
                    className="owner-notification-btn"
                    title="Notifications"
                >
                    <FaBell />
                    <span className="notification-dot"></span>
                </button>


                {/* ORDERS */}
                <button
                    className="owner-orders-btn"
                    onClick={() => navigate("/owner/orders")}
                >
                    <TbReceipt2 />
                    <span>Orders</span>
                </button>


                {/* PROFILE */}
                <div className="owner-profile-wrapper">
                    <button
                        className="owner-profile-btn"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <div className="owner-avatar">
                            {userData?.name
                                ? userData.name.charAt(0).toUpperCase()
                                : <FaUserCircle />
                            }
                        </div>
                        <span className="owner-user-name">
                            {userData?.name || "Owner"}
                        </span>
                        <FaChevronDown className="owner-dropdown-icon" />
                    </button>


                    {/* PROFILE DROPDOWN */}
                    {showProfile && (
                        <div className="owner-profile-dropdown">
                            <div className="profile-user-info">
                                <strong>
                                    {userData?.name || "Owner"}
                                </strong>
                                <span>
                                    {userData?.email || ""}
                                </span>
                            </div>

                            <div className="profile-dropdown-divider"></div>

                            <button
                                className="owner-logout-btn"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
};

export default OwnerNavbar;
