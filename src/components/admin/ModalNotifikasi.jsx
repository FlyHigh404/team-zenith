import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const ModalNotifikasi = () => {
    const [tab, setTab] = useState('notifikasi')

    return (
        <div className="flex flex-col rounded-2xl bg-white p-4 shadow-md w-full max-w-md mx-auto">
            <h2 className="font-semibold text-lg mb-2">Pemberitahuan</h2>

            {/* Tab Header */}
            <div className="flex border-b mb-3">
                <button onClick={() => setTab('notifikasi')} className={`px-4 py-2 text-sm font-medium ${tab === 'notifikasi' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-400'}`}>
                    Notifikasi
                </button>
                <button onClick={() => setTab('koneksi')} className={`px-4 py-2 text-sm font-medium ${tab === 'koneksi' ? 'border-b-2 border-sky-500 text-sky-500' : 'text-gray-400'}`}>
                    Koneksi
                </button>
            </div>

            {/* Tab Content */}
            {tab === 'notifikasi' && (
                <div className="space-y-2">
                    <div className="flex gap-3 bg-white border rounded-xl p-3 items-start shadow-sm">
                        <FaUserCircle className="text-blue-600 text-3xl" />
                        {/* <img src="https://placekitten.com/50/50" className="w-10 h-10 rounded-full" /> */}
                        <div>
                            <p className="font-semibold">Farizah Farhana</p>
                            <p className="text-sm text-gray-600">Welder – Plate 3G GMAW & GTAW</p>
                            <p className="text-sm mt-1">"Halo semuanya, salam kenal yaa..."</p>
                            <p className="text-xs text-gray-400 mt-1">14 jam yang lalu</p>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'koneksi' && (
                <div className="space-y-2">
                    <div className='flex justify-end'>
                        <Link to="/koneksi" className="text-md font-medium text-gray-500 hover:underline" > Lihat Koneksi </Link>
                    </div>
                    <div className="flex gap-3 items-start bg-white border rounded-xl p-3 shadow-sm">
                        <FaUserCircle className="text-blue-600 text-3xl" />
                        {/* <img src="https://placekitten.com/50/50" className="w-10 h-10 rounded-full" /> */}
                        <div className="flex-1">
                            <p className="font-semibold">Andi Prasetyo</p>
                            <p className="text-xs text-gray-600">Welder – Plate 3G GMAW & GTAW</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-sm border text-gray-600 px-2 py-1 rounded"><FaCheck /></button>
                            <button className="text-sm border text-gray-600 px-2 py-1 rounded">
                                <FaXmark /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalNotifikasi
