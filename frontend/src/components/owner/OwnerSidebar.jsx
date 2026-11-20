import React from 'react'
import { Link } from "react-router-dom";

import {
    FaHome,
    FaStore,
    FaUtensils,
    FaChartLine
} from "react-icons/fa";

import "./OwnerSidebar.css"
const OwnerSidebar = () => {
    return (
        <div>
            <div className="admin-sidebar">

                <h2>Fomato</h2>

                <nav>

                    <Link to="/owner-dashboard">
                        <FaHome /> Dashboard
                    </Link>

                    <Link to="/admin/products">
                        Products
                    </Link>

                    <Link to="/admin/categories">
                        Categories
                    </Link>

                    <Link to="/admin/customers">
                        Customers
                    </Link>

                    <Link to="/admin/orders">
                        Orders
                    </Link>

                </nav>

                <button className="logout-btn" onClick={() => localStorage.removeItem("accessToken")}>
                    <Link to="/signin">Log Out</Link>
                </button>

            </div>
        </div>
    )
}
export default OwnerSidebar