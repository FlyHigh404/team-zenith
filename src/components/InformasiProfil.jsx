import React from 'react'
import { FaUser, FaPenToSquare  } from "react-icons/fa6";

const InformasiProfil = () => {
    return (
        <div className="flex flex-col border-gray-300 border mt-4 rounded-2xl bg-white font-sans">
            <div className="relative">
                <div className="bg-blue-300 h-40 rounded-t-2xl"></div>

                <div className="absolute pl-4 -bottom-12">
                    <div className="w-28 h-28 bg-blue-700 rounded-full border-4 border-white "></div>
                </div>
            </div>
            
            <div className="flex flex-row mt-10 gap-40">
                <div className='flex flex-col p-4'>
                    <div className="flex flex-row gap-2 items-center">
                        <h2 className="font-semibold text-xl">UNEDO</h2>
                        <div className="bg-yellow-500 h-5 w-5 rounded-full"></div>
                    </div>
                    <p className="mt-1">Akun resmi UNEDO</p>
                    <p className="mt-1">Surabaya, Jawa Timur</p>
                    <p className="mt-1 text-sky-500">0 Koneksi</p>
                    <div className="hidden lg:flex justify-between mt-3">
                        <a href="#tambah-postingan">
                            <button className="flex flex-row gap-2 items-center px-4 py-1 bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-full hover:bg-sky-500">
                                <FaPenToSquare className="text-sm" />
                                <p className="text-sm font-medium text-white">Ubah Profil</p>
                            </button>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col p-4">
                    <div className="flex flex-row gap-1">
                        <FaUser className="mt-1"/>
                        <div className="flex flex-col ml-2">
                            <p className="font-semibold">Username</p>
                            <p className="">@unedo</p>
                        </div>
                    </div>
                    
                    {/* <div className="flex flex-row gap-1 mt-2">
                        <div className="bg-black w-4 h-4 rounded-full"></div>
                        <div className="flex flex-col ml-2">
                            <p className="font-semibold">Username</p>
                            <p className="">@unedo</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default InformasiProfil