import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import img from '../assets/img/register.png'

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Password tidak sama!");
            return;
        }
        navigate("/register-next", { state: formData });
    };

    return (
        <div className='flex h-screen'>
            <div className='w-[55%] flex flex-col justify-center px-20 my-auto'>
                <h2 className='text-md font-semibold'>Get Started Now</h2>
                <p className='text-xs mt-2 font-medium'>Enter your Credentials to access your account</p>
                <form className='mt-3' onSubmit={handleNext}>
                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Name</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="input input-bordered w-full rounded-[10px] placeholder:text-xs"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="input input-bordered w-full rounded-[10px] placeholder:text-xs"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="input input-bordered w-full rounded-[10px] placeholder:text-xs"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-medium mb-1'>Confirmation Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="input input-bordered w-full rounded-[10px] pr-10 placeholder:text-xs"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 cursor-pointer text-gray-500"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full text-xs rounded-[10px]">
                        Next
                    </button>
                </form>
                <div className='divider my-2 font-semibold text-xs'>Or</div>

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
