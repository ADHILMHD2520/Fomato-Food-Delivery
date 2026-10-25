import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./AddItem.css";

const AddItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
    ]

    const navigate = useNavigate();

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category || !foodType || !image) {
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
            formData.append("image", image);

            const result = await axios.post(
                "http://localhost:5000/api/item/create-item",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Item created:", result.data);
            alert("Item added successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error creating item:", error);
            alert(
                error.response?.data?.message ||
                "Failed to add item"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-gray-600 hover:text-black"
                    >
                        <IoMdArrowBack size={25} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">Add Food Item</h1>
                        <p className="text-gray-500 text-sm">
                            Add a new food item to your shop
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium">
                            Item Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter food name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Select Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat, index) => (
                                    <option value={cat} key={index}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Food Type
                            </label>
                            <select
                                value={foodType}
                                onChange={(e) => setFoodType(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            >
                                <option value="">Select food type</option>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Food Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3"
                        />
                    </div>

                    {image && (
                        <div className="mt-3">
                            <p className="text-sm text-gray-500 mb-2">
                                Image Preview
                            </p>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Food preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4d2d] text-white py-3 rounded-lg font-semibold hover:bg-[#e84325] disabled:opacity-50"
                    >
                        {loading ? "Adding Item..." : "Add Item"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
