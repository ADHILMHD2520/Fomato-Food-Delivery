import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./EditItem.css";

const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others"
];

const EditItem = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await axios.get(
                    `http://localhost:5000/api/item/get-item/${itemId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const item = result.data;
                setName(item.name);
                setPrice(item.price);
                setCategory(item.category);
                setFoodType(item.foodType);
                setOldImage(item.image);
            } catch (error) {
                console.log("Error fetching item:", error);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category || !foodType) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("name", name);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("foodType", foodType);

            if (image) {
                formData.append("image", image);
            }

            const result = await axios.put(
                `http://localhost:5000/api/item/edit-item/${itemId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Item updated:", result.data);
            alert("Item updated successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error updating item:", error);
            alert(
                error.response?.data?.message ||
                "Failed to update item"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-item-page">
            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                <IoMdArrowBack size={22} />
                Back
            </button>

            <div className="edit-item-container">
                <h1>Edit Food Item</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Food Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter food name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat, index) => (
                                <option value={cat} key={index}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Food Type</label>
                        <select
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                        >
                            <option value="">Select Food Type</option>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Food Image</label>

                        {oldImage && (
                            <img
                                src={oldImage}
                                alt={name}
                                className="old-item-image"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </div>

                    <button
                        type="submit"
                        className="update-item-btn"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Food Item"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditItem;