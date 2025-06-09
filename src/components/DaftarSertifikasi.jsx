import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import dataSertifikasi from '../data/sertifikasi'
import { Link } from "react-router-dom";
import { FaClock, FaToolbox, FaCalendar, FaLocationDot } from "react-icons/fa6";

const DaftarSertifikasi = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState(dataSertifikasi[0]);
    const user = { role: "user" }; // ganti "admin"
    const isAdmin = user.role === "admin";

    return (
        <div className="flex flex-col md:flex-row gap-4 px-4 items-stretch h-full">

            {/* Kiri: Daftar Sertifikasi */}
            <div className="w-full md:w-1/2 space-y-2 h-full">
                {dataSertifikasi.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelected(item)}
                        className={`px-6 py-4 rounded-xl cursor-pointer shadow-sm ${selected.id === item.id ? "bg-blue-100" : "bg-white"
                            }`}
                    >
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">{item.bidang} - {item.keahlian} </p>
                        <div className='flex justify-between my-2'>
                            <div className='flex'>
                                <FaCalendar className='text-gray-400 text-xs mt-1' />
                                <p className='ml-1 text-black text-xs pt-0.5'>{item.tanggal}</p>
                            </div>
                            <div className='flex'>
                                <FaClock className='text-gray-400 text-xs mt-1' />
                                <p className='ml-1 text-black text-xs pt-0.5'>{item.waktu}</p>
                            </div>
                            <div className='flex'>
                                <FaLocationDot className='text-gray-400 text-xs mt-1' />
                                <p className='ml-1 text-black text-xs pt-0.5'>{item.lokasi}</p>
                            </div>
                            <div className='flex'>
                                <FaToolbox className='text-gray-400 text-xs mt-1' />
                                <p className='ml-1 text-black text-sm'>{item.metode}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Kanan: Detail Sertifikasi */}
            <div className="w-full md:w-1/2 border-sky-100 p-4 rounded-lg shadow-sm bg-white h-full">
                <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{selected.bidang} - {selected.keahlian}</p>
                <div className='flex justify-between my-2'>
                    <div className='flex'>
                        <FaCalendar className='text-gray-400 text-xs mt-1' />
                        <p className='ml-1 text-black text-xs pt-0.5'>{selected.tanggal}</p>
                    </div>
                    <div className='flex'>
                        <FaClock className='text-gray-400 text-xs mt-1' />
                        <p className='ml-1 text-black text-xs pt-0.5'>{selected.waktu}</p>
                    </div>
                    <div className='flex'>
                        <FaLocationDot className='text-gray-400 text-xs mt-1' />
                        <p className='ml-1 text-black text-xs pt-0.5'>{selected.lokasi}</p>
                    </div>
                    <div className='flex'>
                        <FaToolbox className='text-gray-400 text-xs mt-1' />
                        <p className='ml-1 text-black text-sm'>{selected.metode}</p>
                    </div>
                </div>

                <h4 className="font-semibold mt-4">Tentang Sertifikasi</h4>
                <p className="text-sm mb-2">{selected.deskripsi}</p>

                <h4 className="font-semibold mt-4">Sertifikat yang Didapat</h4>
                <ul className="list-disc list-inside text-sm">
                    {selected.sertifikat.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>

                <h4 className="font-semibold mt-4">Syarat Peserta</h4>
                <ul className="list-disc list-inside text-sm">
                    {selected.syarat.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>

                <h4 className="font-semibold mt-4">Fasilitas</h4>
                <ul className="list-disc list-inside text-sm">
                    {selected.fasilitas.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>

                <div className="mt-4 text-sm">
                    <p><strong>Kuota Minimal:</strong> {selected.kuota}</p>
                    <p><strong>Catatan:</strong> {selected.catatan}</p>
                </div>

                <div className="flex justify-end mt-4">
                    <Link to={`/sertifikasi/apply/${selected.id}`}>
                        <button
                            className={`px-10 py-2 rounded-xl text-sm text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                            disabled={isAdmin}
                        >
                            Daftar
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default DaftarSertifikasi
