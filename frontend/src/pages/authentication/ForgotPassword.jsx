import React, { useState } from 'react'

const ForgotPassword = () => {
    const [step, setStep] = useState(3);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password:"",
        confirmpassword:"",
    })



    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 '>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <h1 className='font-bold text-center '>Forgot Password</h1>

                {step == 1 &&
                    <div>
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
                        <button
                            className='w-full bg-orange-600
                        hover:bg-orange-700 text-white font-medium
                        py-2 px-5 rounded-lg
                        transition-colors duration-200
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Send OTP
                        </button>

                    </div>}
                {step == 2 &&
                    <div>
                        {/* otp */}
                        <div className='mb-3'>
                            <label
                                htmlFor="otp"
                                className='block text-sm font-medium mb-1'
                            >
                                OTP
                            </label>

                            <input
                                type="Number"
                                id="otp"
                                placeholder="Enter your OTP"
                                className='w-full px-3 py-1.5 border rounded-md outline-none text-sm'
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        otp: e.target.value
                                    })
                                }}
                                value={formData.otp}
                                style={{
                                    border: `1px solid #ddd`
                                }}
                            />
                        </div>
                        <button
                            className='w-full bg-orange-600
                        hover:bg-orange-700 text-white font-medium
                        py-2 px-5 rounded-lg
                        transition-colors duration-200
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Verify
                        </button>

                    </div>}

                {step == 3 &&
                    <div>
                        {/* reset password */}
                        <div className='mb-3'>
                            <label
                                htmlFor="pwd"
                                className='block text-sm font-medium mb-1'
                            >
                                Enter Password
                            </label>

                            <input
                                type="String"
                                id="pwd"
                                placeholder="Enter your password"
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
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor="pwd"
                                className='block text-sm font-medium mb-1'
                            >
                                Confirm Password
                            </label>

                            <input
                                type="String"
                                id="conf-pwd"
                                placeholder="Confirm password"
                                className='w-full px-3 py-1.5 border rounded-md outline-none text-sm'
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        confirmpassword: e.target.value
                                    })
                                }}
                                value={formData.confirmpassword}
                                style={{
                                    border: `1px solid #ddd`
                                }}
                            />
                        </div>
                        <button
                            className='w-full bg-orange-600
                        hover:bg-orange-700 text-white font-medium
                        py-2 px-5 rounded-lg
                        transition-colors duration-200
                        focus:outline-none focus:ring-2
                        focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Reset Password
                        </button>
                    </div>}
            </div>
        </div>
    )
}

export default ForgotPassword