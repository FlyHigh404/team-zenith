import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import img from "../assets/img/register.png";
import { FaArrowLeftLong } from "react-icons/fa6";
// import { FaGoogle } from 'react-icons/fa6';
// import { FaApple } from 'react-icons/fa6'

const Next = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Ambil data dari localStorage atau location.state
    const [formData, setFormData] = useState(() => {
        return location.state || JSON.parse(localStorage.getItem("formData")) || {
            nama: "",
            username: "",
            email: "",
            password: "",
            birthdate: "",
            lokasi: "",
            notelp: "",
            levelProfesional: "",
            keahlian: "",
            file: null,
        };
    });

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    const handleBack = () => {
        navigate("/register", { state: formData });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDrop = useCallback((acceptedFiles) => {
        setFormData((prev) => ({ ...prev, file: acceptedFiles[0] || null }));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*, application/pdf",
        maxSize: 5 * 1024 * 1024,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            await axios.post("https://api.flyhigh.web.id/api/auth/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Registration successful!");
            localStorage.removeItem("formData"); // Hapus setelah berhasil daftar
        } catch (error) {
            if (error.response && error.response.data.errors) {
                Object.values(error.response.data.errors).forEach((err) => {
                    toast.error(err[0]);
                });
            } else {
                toast.error("Registration failed!");
            }
        }
    };


    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex h-screen relative">
                <button onClick={handleBack} className="absolute top-4 left-8">
                    <FaArrowLeftLong size={20} className="cursor-pointer text-lg" />
                </button>
                <div className="w-[55%] flex flex-col justify-center px-20 my-auto">
                    <h2 className="text-md font-semibold">Complete your Profile</h2>
                    <p className="text-xs mt-2 font-medium">Enter your personal details below</p>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-xs font-medium mb-1">Address</label>
                            <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} className="input input-bordered w-full rounded-[10px]" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium mb-1">Birth Date</label>
                            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="input input-bordered w-full rounded-[10px]" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium mb-1">Telephone Number</label>
                            <input
                                type="number"
                                name="notelp"
                                value={formData.notelp}
                                onChange={handleChange}
                                className="input input-bordered w-full rounded-[10px]"
                                pattern="^\+?\d{10,15}$"
                                placeholder="Enter a valid phone number (10-15 digits, may start with +))"
                                required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-xs font-medium mb-1">Class</label>
                            <select name="levelProfesional" value={formData.levelProfesional} onChange={handleChange} className="select w-full">
                                <option value="">- Choose your class -</option>
                                <option value="1">1st Class</option>
                                <option value="2">2nd Class</option>
                                <option value="3">3rd Class</option>
                            </select>
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-xs font-medium mb-1">Speciality</label>
                            <select name="keahlian" value={formData.keahlian} onChange={handleChange} className="select w-full">
                                <option value="">- Choose your speciality -</option>
                                <option value="plate">Plate Speciality</option>
                                <option value="pipe">Pipe Speciality</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium mb-1">Upload your Certificates</label>
                            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer">
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center">
                                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l5-5m0 0l5 5m-5-5v12"></path>
                                    </svg>
                                    <p className="mt-2 text-xs text-gray-600">PDF, JPG, PNG - Max 5MB</p>
                                    {formData.file ? (
                                        <p className="text-xs text-green-600">{formData.file.name}</p>
                                    ) : (
                                        <p className="font-medium mt-1 text-xs">
                                            Drag and drop your file here or <span className="text-blue-600 cursor-pointer">Browse file</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-2 flex items-center">
                            <input type="checkbox" className="mr-2" name="terms" required />
                            <p className="font-medium text-black dark:text-white text-xs">I agree to <span className="underline">terms & policy</span></p>
                        </div>

                        <button type="submit" className="btn btn-primary w-full text-xs rounded-[10px]">
                            Sign Up
                        </button>
                    </form>
                    {/* <div className='divider my-4 font-semibold text-xs'>Or</div>

                <div className='flex gap-8 justify-center'>
                    <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaGoogle size={16} /> Sign in with Google</button>
                    <button className='btn btn-outline rounded-[10px] px-10 text-xs'><FaApple size={24} /> Sign in with Apple</button>
                </div>

                <p className='text-center font-semibold mt-4 text-xs'>
                    Have an account? <a href='#' className='text-blue-600 font-medium'>Sign In</a>
                </p> */}
                </div>
                <div className="w-[45%] flex justify-end">
                    <img src={img} className="relative rounded-l-3xl" alt="" />
                </div>
            </div>
        </div>

    );
};

export default Next;
