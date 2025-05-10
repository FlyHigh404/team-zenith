import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";
import img from '../assets/img/register.png'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberCheck, setRememberCheck] = useState(false);
    

    const [formData, setFormData] = useState(() => {
        // return location.state || JSON.parse(localStorage.getItem("formData")) || {
        //     email: "",
        //     password: "",
        // };

        const saved = localStorage.getItem("rememberedUser");
        if (saved) {
            const parsed = JSON.parse(saved);
            const now = new Date().getTime();
            const expiresAt = parsed.expiresAt;

            if (now < expiresAt) {
                return {
                    email: parsed.email,
                    password: parsed.password,
                };
            } else {
                localStorage.removeItem("rememberedUser");
            }
        }
        return {
            email: "",
            password: "",
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://api.flyhigh.web.id/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", response.data.token); //Simpan token ke localStorage
            
            //ingat untuk 14 hari
            if (rememberCheck) {
                const fourteenDays = 14 * 24 * 60 * 60 * 1000;
                const expiresAt = new Date().getTime() + fourteenDays;
    
                localStorage.setItem("rememberedUser", JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    expiresAt: expiresAt,
                }));
            } else {
                localStorage.removeItem("rememberedUser");
            }
            
            toast.success("Login successful!");
            navigate("/");

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
        <div className="flex md:flex-col lg:flex-row h-screen">
            <div className="flex-grow w-full lg:w-[55%] flex flex-col justify-center px-6 md:px-20 overflow-y-auto font-sans">
                <h2 className="text-3xl font-semibold">Selamat Datang</h2>
                <p className="text-sm md:text-base mt-1 font-medium">Masuk ke akunmu dan jelajahi peluang tanpa batas!</p>

                <form className="mt-5 md:mt-10 lg:mt-5" onSubmit={handleSubmit}>
                    <div className="mb-4 md:mb-7 lg:mb-4">
                        <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan alamat email Anda" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Kata Sandi</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Buat kata sandi Anda"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm placeholder:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer text-gray-500">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-between mb-7'>
                        <div className='flex items-center'>
                            <button type="button" onClick={() => setRememberCheck(!rememberCheck)} className='text-lg'>
                                {rememberCheck ? <MdCheckBox className="text-[#0284C7]" /> : <MdCheckBoxOutlineBlank />}
                            </button>
                            <p className='text-sm ml-1.5'>Ingat untuk 14 hari</p>
                        </div>
                        <span onClick={handleForgotPassword} className="text-sm font-medium text-[#0284C7] text-right cursor-pointer">Lupa kata sandi?</span>
                    </div>
                    

                    <button type="submit" className="btn btn-primary bg-[#86CEEB] border border-[#86CEEB] hover:bg-[#659BB0] hover:border-[#659BB0] w-full text-sm md:text-base lg:text-sm rounded-[10px]">
                        Masuk sekarang
                    </button>
                </form>

                <div className="divider my-4 font-semibold text-xs text-gray-400">atau</div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
                    <button className="btn btn-outline rounded-[10px] px-8 text-xs">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg> Masuk dengan Google
                    </button>
                    <button className="btn btn-outline rounded-[10px] px-8 text-xs">
                        <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1195 1195"><path fill="#000" d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"></path></svg> Masuk dengan Apple
                    </button>
                </div>
                <p className="text-center font-normal mt-4 text-sm">
                    Tidak punya akun?{' '}
                    <span onClick={handleRegister} className="text-[#0284C7] font-medium hover:underline cursor-pointer text-sm">
                        Daftar
                    </span>
                </p>
            </div>
            
            <div className="hidden lg:flex w-[45%] justify-end">
                    <img src={img} className="sticky top-0 h-screen object-cover rounded-l-3xl" alt="" />
            </div>
        </div>
    );
};

export default Login;