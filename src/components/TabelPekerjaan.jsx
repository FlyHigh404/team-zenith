import React from 'react'
import { FaEye } from "react-icons/fa6";

const TabelPekerjaan = () => {
    return (
        <div className='bg-white mx-5 mt-5 p-5 rounded-xl'>
            <div className="flex items-center space-x-4">
                <span className="text-black">Show</span>
                <select className="px-3 py-2 rounded-md bg-gray-200 focus:outline-none">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span className="text-black">entries</span>

                <label className="flex items-center gap-2 border border-gray-400 rounded-xl px-3 py-2 w-full focus-within:border-sky-400 transition-all duration-200">
                    <svg className="h-4 w-4 text-gray-400 peer-focus:border-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        placeholder="Search"
                        required
                        className="w-full outline-none bg-transparent text-sm placeholder:text-gray-400"
                    />
                </label>
            </div>
            <div className="overflow-x-auto rounded-xl mt-4">
                <table className="table text-sm">
                    <thead className="text-black">
                        <tr>
                            <th>Nomor</th>
                            <th>Tanggal</th>
                            <th>Pelamar</th>
                            <th>Kota</th>
                            <th>Umur</th>
                            <th>Status</th>
                            <th className="text-center">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { no: 1, tgl: "13/01/2022", nama: "Matt Dickerson", kota: "Surabaya", umur: 18, status: "Melamar" },
                            { no: 2, tgl: "22/01/2022", nama: "Matt Dickerson", kota: "Jakarta", umur: 20, status: "Diterima" },
                            { no: 3, tgl: "15/08/2022", nama: "Tride Byrd", kota: "Surabaya", umur: 30, status: "Diterima" },
                            { no: 4, tgl: "06/09/2022", nama: "Brad Mason", kota: "Bogor", umur: 23, status: "Diterima" },
                            { no: 5, tgl: "25/09/2022", nama: "Sanderson", kota: "Bandung", umur: 19, status: "Ditolak" },
                            { no: 6, tgl: "04/10/2022", nama: "Jan Rodhem", kota: "Semarang", umur: 20, status: "Diterima" },
                            { no: 7, tgl: "17/10/2022", nama: "Miriam Kidd", kota: "Pamekasan", umur: 21, status: "Diterima" },
                            { no: 8, tgl: "24/10/2022", nama: "Dominic", kota: "Denpasar", umur: 23, status: "Diterima" },
                            { no: 9, tgl: "01/11/2022", nama: "Shanice", kota: "Tangerang", umur: 18, status: "Ditolak" },
                        ].map((row, i) => (
                            <tr key={i} className="odd:bg-gray-100 even:bg-white">
                                <td>{row.no.toString().padStart(2, "0")}</td>
                                <td>{row.tgl}</td>
                                <td>{row.nama}</td>
                                <td>{row.kota}</td>
                                <td>{row.umur}</td>
                                <td>{row.status}</td>
                                <td className="text-center align-middle">
                                    <label htmlFor="detail-modal" className="inline-flex justify-center items-center w-full h-full cursor-pointer">
                                        <FaEye className="text-sky-500" />
                                    </label>
                                </td>

                                {/* Modal */}
                                <input type="checkbox" id="detail-modal" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <div className='flex justify-between'>
                                                <h3 className="font-bold text-lg">Detail Pelamar Pekerjaan</h3>
                                                <label htmlFor="detail-modal" className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</label>
                                            </div>
                                        </form>
                                        <hr className='my-3 text-gray-200' />
                                        <p className="py-4">Isi detail di sini sesuai data yang dipilih</p>
                                        <div className="modal-action">
                                            <label htmlFor="detail-modal" className="btn rounded-full px-8">Ditolak</label>
                                            <label htmlFor="detail-modal" className="btn rounded-full px-8 bg-sky-300 hover:bg-sky-400 text-white">Diterima</label>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default TabelPekerjaan
