
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logout, setCity } from "../../redux/userSlice";

import {
    IoLocationSharp,
    IoSearch,
    IoChevronDown
} from "react-icons/io5";

import { CiShoppingCart } from "react-icons/ci";
import { GiChefToque } from "react-icons/gi";

import "./UserNavbar.css";

function UserNavbar() {
    const { userData, city, cartItems } = useSelector((state) => state.user);

    const [showInfo, setShowInfo] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/signin");
    };

    const isHome = location.pathname === "/";
    const isRestaurants = location.pathname === "/restaurants";

    const [showLocation, setShowLocation] = useState(false);
    const [searchCity, setSearchCity] = useState("");

    const handleCityChange = (selectedCity) => {
        dispatch(setCity(selectedCity));
        setShowLocation(false);
        setSearchCity("");
    };

    const availableCities = [
        "Kozhikode",
        "Perambra",
        "Koyilandy",
        "Vadakara",
        "Thamarassery",
        "Balussery",
        "Kunnamangalam",
        "Feroke",
        "Ramanattukara",
        "Malappuram",
        "Wayanad",
        "Kannur"
    ];

    return (
        <header className="foody-navbar">

            {/* Logo */}
            <div
                className="foody-logo"
                onClick={() => navigate("/")}
            >
                <GiChefToque className="foody-logo-icon" />
                <span>Foody</span>
            </div>

            {/* Navigation */}
            <nav className="foody-nav-links">

                <button
                    className={`foody-nav-link ${isHome ? "active" : ""}`}
                    onClick={() => navigate("/")}
                >
                    Home
                </button>

                <button
                    className={`foody-nav-link ${isRestaurants ? "active" : ""}`}
                    onClick={() => navigate("/restaurants")}
                >
                    Restaurants
                </button>

                <button className="foody-nav-link">
                    Offers
                </button>

                <button className="foody-nav-link">
                    About
                </button>

            </nav>

            {/* Location and Search */}
            <div className="foody-search-container">

                <div className="foody-location-wrapper">

                    <button
                        className="foody-location"
                        onClick={() => setShowLocation(!showLocation)}
                    >
                        <IoLocationSharp />

                        <span>{city || "Select Location"}</span>

                        <IoChevronDown className="location-arrow" />
                    </button>

                    {showLocation && (
                        <div className="location-dropdown">

                            <h3>Choose your location</h3>

                            <p>Find restaurants available in your city</p>

                            <div className="location-search">
                                <IoSearch />

                                <input
                                    type="text"
                                    placeholder="Search city..."
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                />
                            </div>

                            <div className="location-list">
                                {availableCities
                                    .filter((item) =>
                                        item.toLowerCase().includes(searchCity.toLowerCase())
                                    )
                                    .map((item) => (
                                        <button
                                            key={item}
                                            className={`location-option ${city === item ? "selected" : ""
                                                }`}
                                            onClick={() => handleCityChange(item)}
                                        >
                                            <IoLocationSharp />
                                            {item}

                                            {city === item && (
                                                <span>✓</span>
                                            )}
                                        </button>
                                    ))}
                            </div>

                        </div>
                    )}
                </div>

                <div className="foody-search">
                    <IoSearch />

                    <input
                        type="text"
                        placeholder="Search for food, restaurants..."
                    />
                </div>

            </div>

            {/* Cart */}
            <div className="foody-cart">
                <CiShoppingCart size={28}
                    onClick={() => navigate("/cart")}
                />
                <span className="foody-cart-count">{cartItems.length}</span>
            </div>

            {/* Orders */}
            <button className="foody-orders">
                My Orders
            </button>

            {/* Profile */}
            <div className="foody-profile-wrapper">

                <button
                    className="foody-profile"
                    onClick={() => setShowInfo((prev) => !prev)}
                >
                    {userData?.name?.slice(0, 1) || "U"}
                </button>

                <IoChevronDown
                    className="foody-profile-arrow"
                    onClick={() => setShowInfo((prev) => !prev)}
                />

                {showInfo && (
                    <div className="foody-profile-dropdown">

                        <p className="foody-profile-name">
                            {userData?.name}
                        </p>

                        <button onClick={handleLogout}>
                            Logout
                        </button>

                    </div>
                )}

            </div>

        </header>
    );
}

export default UserNavbar;
