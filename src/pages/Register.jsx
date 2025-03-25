import React, { useState } from "react";
import img from '../assets/img/register.png'
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className='flex h-screen'>
            <div className='w-[55%] flex flex-col justify-center px-20 my-auto'>
                <h2 className='text-md font-semibold'>Get Started Now</h2>
                <p className='text-xs mt-2 font-medium'>Enter your Credentials to access your account</p>
                <form className='mt-6'>
                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Name</label>
                        <input type='text' placeholder='Enter your name' className='input input-bordered w-full rounded-[10px] placeholder:text-xs' />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Email Address</label>
                        <input type='email' placeholder='Enter your email' className='input w-full rounded-[10px] placeholder:text-xs' />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter your password'
                                className='input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 cursor-pointer text-gray-500'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Confirmation Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder='Confirm your password'
                                className='input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs'
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute right-3 cursor-pointer text-gray-500'
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <Link to="/register-next" className="btn btn-primary w-full text-xs rounded-[10px]">
                        Next
                    </Link>
                </form>
                <div className='divider my-4 font-semibold text-xs'>Or</div>

                <div className='flex gap-8 justify-center'>
                    <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaGoogle size={12} className="mr-3" /> Sign in with Google</button>
                    <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaApple size={16} className="mr-3" /> Sign in with Apple</button>
                </div>

                <p className='text-center font-semibold mt-4 text-xs'>
                    Have an account? <a href='#' className='text-blue-600 font-medium'>Sign In</a>
                </p>
            </div>
            <div className='w-[45%] flex justify-end'>
                <img src={img} className='relative rounded-l-3xl' alt='' />
            </div>
        </div>

    )
}

export default Register
