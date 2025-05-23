import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaEye, FaEllipsisVertical, FaPlus, FaPenToSquare, FaShareNodes, FaTrash } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'

const PostinganAdmin = () => {
    const [isLiked, setIsLiked] = useState(false)
    const [dropDownOpen, setDropDownOpen] = useState(false)
      
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen)
    }

    return (
        <div className="flex flex-col border-gray-300 border mt-4 rounded-2xl bg-white p-4 gap-4 font-sans">
            <div className="flex flex-row gap-3">
                <div className="hidden lg:flex space-x-4">
                    <a href="#postingan-admin">
                        <button className="px-6 py-2 text-base font-semibold bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-xl hover:bg-sky-500 cursor-pointer">Postingan</button>
                    </a>
                </div>
                {/* <div className="hidden lg:flex space-x-4">
                    <a href="#pengalaman-admin">
                        <button className="px-6 py-2 text-base font-normal bg-white dark:bg-[#659BB0] text-gray-700 rounded-xl hover:bg-gray-200 border border-gray-700 cursor-pointer">Pengalaman</button>
                    </a>
                </div>
                <div className="hidden lg:flex space-x-4">
                    <a href="#sertifikat-admin">
                        <button className="px-6 py-2 text-base font-normal bg-white dark:bg-[#659BB0] text-gray-700 rounded-xl hover:bg-gray-200 border border-gray-700 cursor-pointer">Sertifikat</button>
                    </a>
                </div> */}
            </div>

            <div className="flex flex-row w-full justify-between items-center">
                <h2 className="font-semibold text-base">Semua Postingan</h2>
                <a href="#tambah-postingan">
                    <button className="flex flex-row gap-2 items-center px-4 py-2 text-base  bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-xl hover:bg-sky-500">
                        <FaPlus />
                        <p className="text-sm font-semibold text-white">Tambah</p>
                    </button>
                </a>
            </div>

            {/* card postingan */}
            <div className="flex flex-col gap-0">
                <div className="flex flex-col gap-3 border border-gray-300 rounded-t-xl p-4">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-3">
                            <div className="bg-blue-700 w-9 h-9 rounded-full"></div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1 items-center">
                                    <p className="font-semibold text-base">UNEDO</p>
                                    <div className="bg-yellow-500 h-4 w-4 rounded-full"></div>
                                    {/* <p className="text-base">(Anda)</p> */}
                                </div>
                                <p className="text-sm">@unedo</p>
                            </div>
                        </div>
                        
                        
                        <div className="flex flex-row gap-4 items-start">
                            <p className="text-sm text-gray-500">40 menit yang lalu</p>
                            <div className="relative">
                                <div
                                    onClick={toggleDropDown}
                                    className="flex cursor-pointer select-none"
                                >
                                    <FaEllipsisVertical />
                                </div>

                                {dropDownOpen && (
                                    <div className="absolute right-0 mt-2 w-38 bg-white rounded-xl shadow-xl border-gray-500">
                                        <ul className="p-2"> 
                                            <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                                                <FaPenToSquare /><span>Edit</span>
                                            </NavLink>
                                            <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                                                <FaShareNodes  /><span>Bagikan</span>
                                            </NavLink>
                                            <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                                                <FaTrash  /><span>Hapus</span>
                                            </NavLink>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* isi postingan */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin vitae erat nec nisl interdum tristique. Suspendisse potenti. Sed non metus nec sapien sodales varius.</p>
                        <div className="max-w-3xl w-full rounded-lg h-40 bg-gray-400"></div>
                    </div>
                </div>

                <div className="flex flex-row flex-wrap justify-between border border-gray-300 border-t-0 rounded-b-xl px-4 py-2">
                    <div className="flex flex-row gap-2">
                        <button 
                            type="button"
                            onClick={() => setIsLiked(!isLiked)}
                            className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-200"
                        >
                            {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart/>}
                            <p className="text-sm">Menyukai</p>
                        </button>

                        <a href="#komentar-postingan">
                            <button className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-200">
                                <FaRegComment />
                                <p className="text-sm">Komentar</p>
                            </button>
                        </a>
                        <a href="#kirim-postingan">
                            <button className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-200">
                                <FaRegPaperPlane />
                                <p className="text-sm">Kirim</p>
                            </button>
                        </a>
                    </div>
        
                    <a href="#tambah-postingan">
                        <button className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-200">
                            <FaEye />
                            <p className="text-sm">Dilihat 21 Orang</p>
                        </button>
                    </a>
                </div>
            </div>  
            
            
        </div>
    )
}

export default PostinganAdmin