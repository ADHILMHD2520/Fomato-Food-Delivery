import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import axios from "axios";
import { useDispatch } from 'react-redux';


const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
    }
    );

    const [role, setRole] = useState("user");


    const handleSignup = async () => {
        try {
            const result = await axios.post("http://localhost:5000/api/auth/signup",
                {
                    name: formData.fullName,
                    email: formData.email,
                    mobile: formData.mobile,
                    password: formData.password,
                    role: role,
                }
            )
            console.log("result==", result);
            dispatch(setUserData(result.data));
        } catch (error) {
            console.log("signup error", error);

        }
    }

    return (
        <div
            className='min-h-screen w-full flex items-center justify-center p-4'
            style={{
                backgroundColor: "#f9f9f6"
            }}
        >
            <div
                className='bg-white rounded-xl shadow-lg w-full max-w-sm p-6'
                style={{
                    border: `1px solid #ddd`
                }}
            >
                {/* Heading */}
                <h1
                    className='text-2xl font-bold mb-1'
                    style={{ color: "#ff4d2d" }}
                >
                    Fomato
                </h1>

                <p className='text-gray-600 mb-5 text-sm'>
                    Create your account to get started with delicious
                    food deliveries
                </p>

                {/* Full Name */}
                <div className='mb-3'>
                    <label
                        htmlFor="fullName"
                        className='block text-sm font-medium mb-1'
                    >
                        Full Name
                    </label>

                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter your Full Name"
                        className='w-full px-3 py-1.5 border rounded-md outline-none text-sm'
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                fullName: e.target.value
                            })
                        }}
                        value={formData.fullName}
                        style={{
                            border: `1px solid #ddd`
                        }}
                    />
                </div>

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
                            border: `1px solid #ddd`
                        }}
                    />
                </div>

                {/* Mobile */}
                <div className='mb-3'>
                    <label
                        htmlFor="mobile"
                        className='block text-sm font-medium mb-1'
                    >
                        Mobile
                    </label>

                    <input
                        type="tel"
                        id="mobile"
                        placeholder="Enter your Mobile Number"
                        className='w-full px-3 py-1.5 border rounded-md outline-none text-sm'
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                mobile: e.target.value
                            })
                        }}
                        value={formData.mobile}
                        style={{
                            border: `1px solid #ddd`
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
                                border: `1px solid #ddd`
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

                


                {/* role */}
                <div className='mb-3'>
                    <label
                        htmlFor="role"
                        className='block text-sm font-medium mb-1'
                    >
                        Role
                    </label>

                    <div className='flex gap-2'>
                        {['user', 'owner', 'deliveryboy'].map((r) => (
                            <button
                            onClick={() => setRole(r)}
                            style={
                                role==r?
                                {backgroundColor:'rgb(255, 77, 45)',color:'white'}:{border:'rgb(255, 77, 45)',color:'#333'}
                            }
                            key={r}
                                className='flex-1 border rounded-lg px-3 py-2 
                            text-center font-medium transition-colors cursor-pointer'>
                                {r}
                            </button>
                        ))}
                    </div>
                    
                </div>



                <div className='signup-btn'>
                    <button
                        className='w-full bg-orange-600
                        hover:bg-orange-700 text-white font-medium
                        py-2 px-5 rounded-lg
                        transition-colors duration-200
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'
                        onClick={handleSignup}
                    >
                        Signup
                    </button>
                </div>

                <div className="signup-google mt-3">
                    <button
                        className="w-full bg-white hover:bg-gray-50 text-black font-medium
                        py-2 px-5 rounded-lg transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:ring-offset-2 flex items-center justify-center gap-3 border cursor-pointer"
                    >
                        <FcGoogle size={20} />
                        <span>Signup with Google</span>
                    </button>
                </div>

                <div className='signin mt-3 font-medium text-sm'>
                    <p>
                        Already have an Account?{" "}
                        <Link to="/signin">
                            <span className='text-[#ff4d2d]'>Sign in</span>
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Signup