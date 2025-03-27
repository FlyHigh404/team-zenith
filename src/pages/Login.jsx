import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import img from '../assets/img/register.png'

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/register");
    };

    const [formData, setFormData] = useState(() => {
        return location.state || JSON.parse(localStorage.getItem("formData")) || {
            email: "",
            password: "",
        };
    });

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://api.flyhigh.web.id/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", response.data.token); //Simpan token ke localStorage
            toast.success("Login successful!");
            navigate("/dashboard");

        } catch (error) {
            if (error.response && error.response.data.errors) {
                Object.values(error.response.data.errors).forEach((err) => {
                    toast.error(err[0]);
                });
            } else if (error.response && error.response.status === 401) {
                toast.error("Incorrect email or password.");
            } else {
                toast.error("Login failed! Please try again.");
            }
        }  
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex h-screen relative">
                <div className="w-[55%] flex flex-col justify-center px-20 my-auto">
                    <h2 className="text-lg font-semibold">Welcome back!</h2>
                    <p className="text-sm mt-1 font-medium">Enter your Credentials to access your account</p>
                    <form className="mt-8" onSubmit={handleSubmit}>
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

                        <div className='mb-2'>
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

                        <div className='flex justify-between mt-0 mb-6'>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" name="terms" required />
                                <p className="font-medium text-black dark:text-white text-xs">I agree to <span className="underline cursor-pointer">terms & policy</span></p>
                            </div>
                            <span className="text-xs font-medium text-blue-700 text-right cursor-pointer">Forgot Password?</span>
                        </div>
                        

                        <button type="submit" className="btn btn-primary w-full text-xs rounded-[10px]">
                            Login
                        </button>
                    </form>
                    <div className='divider my-2 font-semibold text-xs  mt-5 mb-5'>Or</div>
                    
                    <div className='flex gap-8 justify-center'>
                        <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaGoogle size={12} className="mr-3" /> Sign in with Google</button>
                        <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaApple size={16} className="mr-3" /> Sign in with Apple</button>
                    </div>
                    
                    <p className='text-center font-semibold mt-4 text-xs'>
                        Don't have an account? 
                        <span onClick={handleRegister} className='text-blue-700 font-medium cursor-pointer'> Sign Up</span>
                    </p>
                </div>
                <div className="w-[45%] flex justify-end">
                    <img src={img} className="relative rounded-l-3xl" alt="" />
                </div>
            </div>
        </div>

    );
}

export default Login
