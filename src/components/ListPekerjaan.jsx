import React from 'react'
import img from '../assets/img/sertifikasi.png'
import { FaBookmark, FaClock, FaToolbox } from "react-icons/fa6";
import { FaHardHat } from "react-icons/fa";

const ListPekerjaan = () => {
    const openDetailModal = () => {
        document.getElementById('detailModal').showModal()
    }

    const openEditModal = () => {
        document.getElementById('editModal').showModal()
    }

    return (
        <div className='mt-10 mx-5'>
            <div className='flex justify-between'>
                <h1 className='text-[#333B69] text-xl font-semibold'>Sertifikasi Saat Ini</h1>
                <button className="btn bg-sky-400 hover:bg-sky-500 text-white font-light rounded-xl px-8">+ Tambah</button>
            </div>

            <div className="mt-5 space-y-4">
                {[{
                    title: 'Sertifikasi SMAW 3G Plate',
                    bidang: 'Welder',
                    keahlian: 'Plate',
                    tanggal: '12 Januari 2025'
                }, {
                    title: 'Sertifikasi TIG 6G Pipe',
                    bidang: 'Welder',
                    keahlian: 'Pipe',
                    tanggal: '28 Februari 2025'
                }, {
                    title: 'Sertifikasi MIG 2G Structural',
                    bidang: 'Welder',
                    keahlian: 'Structural',
                    tanggal: '15 Maret 2025'
                }, {
                    title: 'Sertifikasi Welding Inspector Level 1',
                    bidang: 'Inspector',
                    keahlian: 'Inspector',
                    tanggal: '22 Maret 2025'
                }].map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
                        <div className='p-2'>
                            <img src={img} alt="" />
                        </div>

                        <div className="flex flex-col w-[200px]">
                            <p className="font-medium text-base truncate">{item.title}</p>
                            <p className="text-sm text-sky-400">Materi Sertifikasi</p>
                        </div>

                        <div className="flex flex-col w-[100px]">
                            <p className="font-medium text-base">{item.bidang}</p>
                            <p className="text-sm text-sky-400">Bidang</p>
                        </div>

                        <div className="flex flex-col w-[100px]">
                            <p className="font-medium text-base">{item.keahlian}</p>
                            <p className="text-sm text-sky-400">Keahlian</p>
                        </div>

                        <div className="flex flex-col w-[150px]">
                            <p className="font-medium text-base">{item.tanggal}</p>
                            <p className="text-sm text-sky-400">Tanggal Pelaksanaan</p>
                        </div>

                        <div className='p-2'>
                            <button
                                className="btn btn-outline outline-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-full px-10"
                                onClick={openDetailModal}
                            >
                                Lihat Detail
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            <dialog id="detailModal" className="modal">
                <div className="modal-box w-90">
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <img src={img} className='w-10' />
                            <div>
                                <p className="font-semibold text-base truncate">PT. Karya Baja</p>
                                <p className="text-sm">Cilegon, Banten</p>
                            </div>
                        </div>
                        <FaBookmark className='text-sm' />
                    </div>

                    <div className='mt-4'>
                        {/* <p className="font-medium text-lg">Welder – SMAW 3G</p> */}
                        <div className='grid grid-cols-4 my-2 text-gray-400'>
                            <div className='flex gap-4'>
                                <FaClock />
                                <p>Jangka Panjang</p>
                            </div>
                            <div className='flex gap-4'>
                                <FaHardHat />
                                <p>Konstruksi</p>
                            </div>
                            <div className='flex gap-4'>
                                <FaToolbox />
                                <p>3 - 6 tahun</p>
                            </div>
                        </div>
                        {/* <p className='font-medium text-md'>Pengelasan struktur baja untuk jembatan dan tangki penyimpanan, dengan posisi vertical-up.</p> */}
                    </div>

                    <div className="modal-action flex justify-between">
                        <button className="btn text-gray-400" type="button" onClick={openEditModal}>
                            Edit
                        </button>
                        <form method="dialog">
                            <button className="btn text-[#86CEEB]">Daftar Pelamar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Edit Modal */}
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Sertifikasi</h3>
                    <div>
                        <input className="input input-bordered w-full mt-3" placeholder="Nama Sertifikasi" />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Simpan</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ListPekerjaan
