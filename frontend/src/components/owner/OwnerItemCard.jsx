import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";
import "./OwnerItemCard.css";
import { useNavigate } from "react-router-dom";

const OwnerItemCard = ({ shopId }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const token = localStorage.getItem("token");

            const result = await axios.get(
                `http://localhost:5000/api/item/get-items/${shopId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setItems(result.data);
        } catch (error) {
            console.log("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shopId) {
            fetchItems();
        }
    }, [shopId]);

    const handleDelete = async (itemId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/item/delete-item/${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setItems(items.filter((item) => item._id !== itemId));
        } catch (error) {
            console.log("Error deleting item:", error);
        }
    };

    if (loading) {
        return <p className="item-loading">Loading items...</p>;
    }

    return (
        <div className="owner-items-section">
            <h2 className="owner-items-title">Your Food Items</h2>

            {items.length === 0 ? (
                <div className="no-items">
                    <p>No food items added yet.</p>
                </div>
            ) : (
                <div className="owner-items-grid">
                    {items.map((item) => (
                        <div className="owner-item-card" key={item._id}>

                            <div className="owner-item-image-container">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="owner-item-image"
                                />

                                <span
                                    className={`food-type ${item.foodType === "veg"
                                            ? "veg"
                                            : "non-veg"
                                        }`}
                                >
                                    {item.foodType}
                                </span>
                            </div>

                            <div className="owner-item-content">

                                <h3>{item.name}</h3>

                                <p className="item-category">
                                    {item.category}
                                </p>

                                <p className="item-price">
                                    ₹{item.price}
                                </p>

                                <div className="item-actions">

                                    <button
                                        className="edit-item-btn"
                                        onClick={() => navigate(`/edit-item/${item._id}`)}
                                    >
                                        <FaPen size={13} />
                                        Edit
                                    </button>

                                    <button
                                        className="delete-item-btn"
                                        onClick={() =>
                                            handleDelete(item._id)
                                        }
                                    >
                                        <FaTrash size={13} />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerItemCard;