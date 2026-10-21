import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


import axios from "axios";
import { setUserData } from '../../redux/userSlice';


const Signin = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64233";
    const bgColor = "#f9f9f6";
    const borderColor = "#ddd";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch()


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    }
    );


    const handleSignin = async () => {
        try {
            const result = await axios.post(
                "http://localhost:5000/api/auth/signin",
                {
                    email: formData.email,
                    password: formData.password
                }
            );
            console.log("result==", result);
            console.log("✅ SIGN IN SUCCESSFUL:", formData.email);

            // Save token first
            localStorage.setItem("token", result.data.token);

            // Get complete user data
            const userResult = await axios.get(
                "http://localhost:5000/api/auth/current",
                {
                    headers: {
                        Authorization: `Bearer ${result.data.token}`
                    }
                }
            );
            // Store complete user data in Redux
            dispatch(setUserData(userResult.data));

            // Navigate only after user data is loaded
            navigate("/");

        } catch (error) {
            console.log("signin error", error);
        }
    };

    return (
        <div
            className='min-h-screen w-full flex items-center justify-center p-4'
            style={{
                backgroundColor: bgColor
            }}
        >
            <div
                className='bg-white rounded-xl shadow-lg w-full max-w-sm p-6'
                style={{
                    border: `1px solid ${borderColor}`
                }}
            >
                {/* Heading */}
                <h1
                    className='text-2xl font-bold mb-1'
                    style={{ color: primaryColor }}
                >
                    Fomato
                </h1>

                <p className='text-gray-600 mb-5 text-sm'>
                    Sign in to your account to get started with delicious
                    food deliveries
                </p>

                {/* Email */}
                <div className='mb-3'>
                    <label
                        htmlFor="email"
                        className='block text-sm font-medium mb-1'
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your Email"
                        className='w-full px-3 py-1.5 border rounded-md outline-none text-sm'
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }}
                        value={formData.email}
                        style={{
                            border: `1px solid ${borderColor}`
                        }}
                    />
                </div>


                {/* Password */}
                <div className='mb-3'>
                    <label
                        htmlFor="password"
                        className='block text-sm font-medium mb-1'
                    >
                        Password
                    </label>

                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="pwd"
                            placeholder="Enter your Password"
                            className='w-full px-3 py-1.5 border rounded-md outline-none text-sm'
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }}
                            value={formData.password}
                            style={{
                                border: `1px solid ${borderColor}`
                            }}
                        />

                        <button
                            className='cursor-pointer absolute right-3 top-2 text-gray-500'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {!showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>


                <div className='signin-btn'>
                    <button
                        className='w-full bg-orange-600
                        hover:bg-orange-700 text-white font-medium
                        py-2 px-5 rounded-lg
                        transition-colors duration-200
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2'
                        onClick={handleSignin}
                    >
                        Signin
                    </button>
                </div>

                <div className="signin-google mt-3">
                    <button
                        className="w-full bg-white hover:bg-gray-50 text-black font-medium
                        py-2 px-5 rounded-lg transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:ring-offset-2 flex items-center justify-center gap-3 border"
                    >
                        <FcGoogle size={20} />
                        <span>Sign in with Google</span>
                    </button>
                </div>

                <div className='signin mt-3 font-medium text-sm'>
                    <p>
                        Don't have an Account?{" "}
                        <Link to="/signup">
                            <span className='text-[#ff4d2d]'>Sign Up</span>
                        </Link>
                    </p>
                </div>

                {/* <div className='signin right-0 font-medium text-sm'>
                    <p>
                        <Link to="/forgot">
                            <span className='text-[#ff4d2d]'>Forgot Password</span>
                        </Link>
                    </p>
                </div> */}



            </div>
        </div>
    )
}

export default Signin