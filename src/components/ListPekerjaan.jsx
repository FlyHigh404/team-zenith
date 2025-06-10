import React from 'react'
import img from '../assets/img/sertifikasi.png'
import dataLoker from '../data/loker';
import { FaRegBookmark, FaClock, FaToolbox } from "react-icons/fa6";
import { FaHardHat } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ListPekerjaan = () => {
    const openTambahModal = () => {
        document.getElementById('tambahModal').showModal()
    }

    const openDetailModal = () => {
        document.getElementById('detailModal').showModal()
    }

    const openEditModal = () => {
        document.getElementById('editModal').showModal()
    }

    const navigate = useNavigate();

    return (
        <div className='mt-10 mx-5'>
            <div className='flex justify-between'>
                <h1 className='text-[#333B69] text-xl font-semibold'>Lowongan Saat Ini</h1>
                <button onClick={openTambahModal} className="btn bg-sky-400 hover:bg-sky-500 text-white font-light rounded-xl px-8">+ Tambah</button>

                <dialog id="tambahModal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <div className='flex justify-between'>
                                <h3 className="font-bold text-lg">Tambah Lowongan</h3>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
                            </div>
                        </form>
                        <hr className='my-3 text-gray-200' />

                        <div className='my-2 space-y-2'>
                            {[
                                "Bidang Pekerjaan",
                                "Nama Perusahaan",
                                "Lokasi Kerja",
                                "Status Pekerjaan",
                                "Durasi Pekerjaan",
                                "Pengalaman",
                                "Bidang Pekerjaan",
                                "Deskripsi Pekerjaan",
                                "Pendidikan Terakhir"
                            ].map((label, i) => (
                                <div key={i}>
                                    <label className='font-medium text-md'>{label}</label>
                                    <input className="input input-bordered w-full mt-1.5" placeholder={label} />
                                </div>
                            ))}
                        </div>

                        <div className="modal-action flex justify-end">
                            <button className="btn bg-sky-400 text-white rounded-full px-10">Simpan</button>
                        </div>
                    </div>
                </dialog>

            </div>

            <div className="mt-5 space-y-4">
                {dataLoker.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
                        <div className='p-2'>
                            <img src={img} alt="" />
                        </div>

                        <div className="flex flex-col w-[200px]">
                            <p className="font-medium text-base truncate">{item.position}</p>
                            <p className="text-sm text-sky-400">Bidang Pekerjaan</p>
                        </div>

                        <div className="flex flex-col w-[200px]">
                            <p className="font-medium text-base">{item.company}</p>
                            <p className="text-sm text-sky-400">Perusahaan</p>
                        </div>

                        <div className="flex flex-col w-[100px]">
                            <p className="font-medium text-base">{item.category}</p>
                            <p className="text-sm text-sky-400">Industri</p>
                        </div>

                        <div className="flex flex-col w-[150px]">
                            <p className="font-medium text-base">{item.location}</p>
                            <p className="text-sm text-sky-400">Lokasi</p>
                        </div>

                        <div className='p-2'>
                            <button
                                className="btn btn-outline outline-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-full px-10"
                                onClick={openDetailModal}
                            >
                                Lihat Detail
                            </button>
                        </div>

                        {/* Detail Modal */}
                        <dialog id="detailModal" className="modal">
                            <div className="modal-box w-full max-w-md rounded-xl shadow-lg p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={img} alt="Company Logo" className="w-12 h-12 rounded-md bg-gray-200" />
                                        <div>
                                            <p className="font-semibold text-base">{item.company}</p>
                                            <p className="text-sm text-gray-500">{item.location}</p>
                                        </div>
                                    </div>
                                    <FaRegBookmark className="text-gray-400 text-lg mt-1" />
                                </div>

                                {/* Title */}
                                <p className="text-lg font-medium text-gray-900 mb-2">{item.position}</p>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-gray-400" />
                                        <span>{item.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaHardHat className="text-gray-400" />
                                        <span>{item.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaToolbox className="text-gray-400" />
                                        <span>{item.experience}</span>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <p className="text-sm text-gray-700 mb-4">
                                    Pengelasan struktur baja untuk jembatan dan tangki penyimpanan, dengan posisi vertical-up.
                                </p>

                                {/* Action */}
                                <div className="modal-action flex justify-between mt-6">
                                    <button
                                        type="button"
                                        className="text-sm text-gray-500 hover:underline"
                                        onClick={openEditModal}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-sm text-[#86CEEB] font-medium hover:underline"
                                        onClick={() => navigate('/pelamar-pekerjaan')}
                                    >
                                        Daftar Pelamar
                                    </button>
                                </div>
                            </div>
                        </dialog>

                        {/* Edit Modal */}
                        <dialog id="editModal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <div className='flex justify-between'>
                                        <h3 className="font-bold text-lg">Edit Pekerjaan</h3>
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
                                    </div>
                                </form>
                                <hr className='my-3 text-gray-200' />
                                <div className='my-2 space-y-2'>
                                    {[
                                        "Bidang Pekerjaan",
                                        "Nama Perusahaan",
                                        "Lokasi Kerja",
                                        "Status Pekerjaan",
                                        "Durasi Pekerjaan",
                                        "Pengalaman",
                                        "Bidang Pekerjaan",
                                        "Deskripsi Pekerjaan",
                                        "Pendidikan Terakhir"
                                    ].map((label, i) => (
                                        <div key={i}>
                                            <label className='font-medium text-md'>{label}</label>
                                            <input className="input input-bordered w-full mt-1.5" placeholder={label} />
                                        </div>
                                    ))}
                                </div>
                                <div className="modal-action flex justify-between">
                                    <button className="btn bg-red-500 text-white rounded-full px-10">Hapus</button>
                                    <button className="btn bg-sky-400 text-white rounded-full px-10">Simpan Perubahan</button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListPekerjaan
