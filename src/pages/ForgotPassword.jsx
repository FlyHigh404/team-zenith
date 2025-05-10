import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdSms, MdPhone } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRegister = () => {
        navigate("/register");
    };

    const options = [
        {
            id: "email",
            title: "Reset via Email",
            desc: "Tautan reset akan dikirim ke alamat email yang terdaftar",
            icon: <MdEmail/>,
        },
        {
            id: "sms",
            title: "Reset via SMS",
            desc: "Tautan reset akan dikirim ke nomor yang terdaftar",
            icon: <MdPhone/>,
        },
        {
            id: "whatsapp",
            title: "Reset via WhatsApp",
            desc: "Tautan reset akan dikirim ke nomor WhatsApp",
            icon: <RiWhatsappFill/>,
        },
    ];

    return (
        <div className="flex flex-col px-6 md:px-20 md:flex lg:flex h-screen items-center font-sans">
            <p className="text-right w-full font-normal mt-6 mb-5 text-md text-[#424242]">
                Belum punya akun?
                <span onClick={handleRegister} className='text-[#0284C7] font-medium cursor-pointer'> Daftar</span>
            </p>
            
            <h2 className="text-3xl font-semibold">Lupa Kata Sandi</h2>
            <p className="text-xl md:text-base mt-2 font-medium text-[#]">Silakan pilih metode untuk mengirim pesan reset kata sandi</p>
            
            <div className="w-full max-w-md space-y-4 mt-14">
                {options.map((item) => (
                <div
                    key={item.id}
                    onClick={() => setSelectedOption(item.id)}
                    className={`flex items-start gap-5 p-5 rounded-xl cursor-pointer border transition-all ${
                    selectedOption === item.id
                        ? "border-[#2FA4D3] bg-[#EBFBFF]"
                        : "border-gray-300 bg-white"
                    }`}
                >
                    <div className="text-3xl place-self-center">{item.icon}</div>
                    <div>
                    <h3 className="font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                </div>
                ))}
            </div>

            <button type="submit" className="btn btn-primary bg-[#86CEEB] border border-[#86CEEB] hover:bg-[#659BB0] hover:border-[#659BB0] text-sm md:text-base lg:text-sm rounded-[10px] mt-5 w-112">
                Kirim Tautan
            </button>

            <p className="font-normal mt-5 text-md text-[#424242]">
                Tidak mendapatkan tautan?
                <span className='text-[#0284C7] font-medium cursor-pointer'> Kirim ulang</span>
            </p>


            
        </div>
    );
};

export default ForgotPassword;