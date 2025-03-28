import React, { useState, useEffect, useCallback } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaCamera } from "react-icons/fa";

const RegisterFormStep2 = ({ formData, setFormData, setStep, navigate }) => {
    const [errors, setErrors] = useState({})
    // const navigate = useNavigate()
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "notelp") {
            const phoneRegex = /^\+?\d{10,15}$/;
            const cleanValue = value.replace(/[^+\d]/g, '');

            setErrors((prev) => ({
                ...prev,
                notelp: phoneRegex.test(cleanValue) ? '' : 'Invalid phone number'
            }));
        }
    }, [setFormData]);

    useEffect(() => {
        const phoneRegex = /^\+?\d{10,15}$/
        let newErrors = {}

        if (formData.notelp && !phoneRegex.test(formData.notelp)) {
            newErrors.notelp = 'Phone number must be 10-15 digits and may start with +'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            localStorage.setItem('formData', JSON.stringify(formData))
        }
    }, [formData])

    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, fotoProfile: reader.result });
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            await axios.post('https://api.flyhigh.web.id/api/auth/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Registration successful!');
            localStorage.removeItem('formData');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errorMessage = Object.values(error.response.data.errors).map((err) => err[0]).join("\n");
                toast.error(errorMessage);
            } else {
                toast.error('Registration failed!');
            }
        }
    };

    return (
        <div className="py-3 md:py-10">
            <div className="relative flex items-center">
                <button onClick={handleBack} className="absolute left-0">
                    <FaArrowLeftLong size={20} className="cursor-pointer text-lg" />
                </button>
                <h2 className="text-2xl font-semibold pl-10">Complete your Profile</h2>
            </div>
            <p className="text-sm md:text-md mt-2 font-medium">Enter your personal details below</p>

            <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col items-center">
                    <label className="relative cursor-pointer group">
                        <div className="avatar">
                            <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden relative bg-gray-100">
                                {image ? (
                                    <img src={image} alt="Profile" className="w-full h-full object-cover aspect-square" />
                                ) : (
                                    <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                                        Add Photo
                                    </span>
                                )}

                            </div>
                        </div>
                        <input
                            type="file" accept="image/*" className="hidden" onChange={handleImageUpload}
                        />

                        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-1 rounded-full shadow-md group-hover:scale-110 transition-all">
                            <FaCamera className="text-gray-600 text-sm" />
                        </div>
                    </label>
                    <p className="text-sm font-medium text-gray-700 my-2">Profile Picture</p>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium mb-1">Address</label>
                    <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs placeholder:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your address home" required />
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium mb-1">Birth Date</label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs placeholder:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium mb-1">Telephone Number</label>
                    <input
                        type="text"
                        name="notelp"
                        value={formData.notelp}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs placeholder:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^+\d]/g, ''))}
                        placeholder="Enter a valid phone number (10-15 digits, may start with +))"
                        required
                    />
                    {errors.notelp && <p className="text-red-500 text-xs mt-1">{errors.notelp}</p>}
                </div>

                <div className="mb-4 relative">
                    <label className="block text-xs font-medium mb-1">Class</label>
                    <select name="levelProfesional" value={formData.levelProfesional} onChange={handleChange} className="select bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">- Choose your class -</option>
                        <option value="1">1st Class</option>
                        <option value="2">2nd Class</option>
                        <option value="3">3rd Class</option>
                    </select>
                </div>

                <div className="mb-4 relative">
                    <label className="block text-xs font-medium mb-1">Speciality</label>
                    <select name="keahlian" value={formData.keahlian} onChange={handleChange} className="select bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">- Choose your speciality -</option>
                        <option value="plate">Plate Speciality</option>
                        <option value="pipe">Pipe Speciality</option>
                    </select>
                </div>

                <div className="my-5 flex items-center">
                    <input type="checkbox" className="mr-2" name="terms" required />
                    <p className="font-medium text-black dark:text-white text-xs">
                        I agree to <span className="underline">terms & policy</span>
                    </p>
                </div>

                <button type="submit" className="btn btn-primary w-full text-xs rounded-[10px]">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default RegisterFormStep2;
