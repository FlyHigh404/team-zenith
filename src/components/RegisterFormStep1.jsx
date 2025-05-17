import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const RegisterFormStep1 = ({ formData, setFormData, setStep }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Password tidak sama!');
            return;
        }
        setStep(2);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="py-3 md:py-10 lg:py-5">
            <h2 className="text-3xl font-semibold">Mulai Sekarang</h2>
            <p className="dark:text-slate-300 text-sm md:text-base mt-1 font-medium">Jelajahi lebih banyak tentang Unedo, buat akun mu sekarang!</p>
            <form className="mt-5 md:mt-10 lg:mt-5" onSubmit={handleNext}>
                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Nama Lengkap</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Buat nama pengguna Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan alamat email Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Kata Sandi</label>
                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Buat kata sandi Anda"
                            className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer text-gray-500">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Konfirmasi Kata Sandi</label>
                    <div className="relative flex items-center">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Masukkan kata sandi Anda"
                            className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 cursor-pointer text-gray-500 dark:text-slate-300">
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary bg-[#86CEEB] dark:bg-[#659BB0] border border-[#86CEEB] hover:bg-[#659BB0] dark:hover:bg-[#2F4852] hover:border-[#659BB0] w-full text-sm md:text-base lg:text-sm rounded-[10px]">
                    Buat Akun
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
            <p className="text-center font-medium mt-4 text-sm">
                Sudah punya akun?{' '}
                <span onClick={handleLogin} className="text-[#0284C7] dark:text-sky-500 font-medium hover:underline">
                    Masuk
                </span>
            </p>
        </div>
    );
};

export default RegisterFormStep1;
