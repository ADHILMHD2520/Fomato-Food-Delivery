import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import "./CreateShop.css"

import { setShopData } from "../../redux/ownerSlice";

const CreateShop = () => {

    const { shopData } = useSelector(state => state.owner)

    const [name, setName] = useState(shopData?.name || "");
    const [city, setCity] = useState(shopData?.city || "");
    const [state, setState] = useState(shopData?.state || "");
    const [address, setAddress] = useState(shopData?.address || "");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !city || !state || !address || (!shopData && !image)) {
            alert("Please fill all fields");
            return;
        }


        try {
            setLoading(true);

            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("name", name);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("address", address);
            formData.append("image", image);

            let result;

            if (shopData) {
                result = await axios.put(
                    `http://localhost:5000/api/shop/edit/${shopData._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                result = await axios.post(
                    "http://localhost:5000/api/shop/create",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            console.log("Shop created:", result.data);

            alert("Shop created successfully!");

            console.log(result.data)
            dispatch(setShopData(result.data))

            navigate("/");

        } catch (error) {

            console.log("Error creating shop:", error);

            alert(
                error.response?.data?.message ||
                "Failed to create shop"
            );

        } finally {
            setLoading(false);
        }
    };
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">

                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-600 hover:text-black"
                    >
                        <IoMdArrowBack size={25} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold shop-create-header">
                            {shopData ? "Edit Shop" : "Create Your Shop"}
                        </h1>

                        <p className="text-gray-500 text-sm">
                            Add your restaurant details
                        </p>
                    </div>

                </div>


                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Shop Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Shop Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter shop name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                        />
                    </div>


                    {/* City & State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-2 font-medium">
                                City
                            </label>

                            <input
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>


                        <div>
                            <label className="block mb-2 font-medium">
                                State
                            </label>

                            <input
                                type="text"
                                placeholder="Enter state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>

                    </div>


                    {/* Address */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Address
                        </label>

                        <textarea
                            placeholder="Enter complete shop address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500 resize-none"
                        />
                    </div>


                    {/* Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Shop Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3"

                        />
                        <div className="image-show">
                            <img src={image} alt="" />
                        </div>
                    </div>


                    {/* Preview */}
                    {image && (
                        <div className="mt-3">

                            <p className="text-sm text-gray-500 mb-2">
                                Image Preview
                            </p>

                            <img
                                src={URL.createObjectURL(image)}
                                alt="Shop preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />

                        </div>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-btn w-full bg-[#ff4d2d] text-white py-3 rounded-lg font-semibold hover:bg-[#e84325] disabled:opacity-50"

                    >
                        {loading
                            ? (shopData ? "Updating Shop..." : "Creating Shop...")
                            : (shopData ? "Edit Shop" : "Create Shop")
                        }
                    </button>

                </form>

            </div>

        </div >
    );
};

export default CreateShop;