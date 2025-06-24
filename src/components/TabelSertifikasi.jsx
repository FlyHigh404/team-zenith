import React, { useState } from 'react'
import { FaEye } from "react-icons/fa6"

const TabelSertifikasi = ({ pendaftar = [] }) => {
    const hitungUmur = (tanggalLahir) => {
        const birthDate = new Date(tanggalLahir)
        const today = new Date()
        let umur = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) umur--
        return umur
    }
    const [alasanInputs, setAlasanInputs] = useState({});

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
                            <th className="text-center">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendaftar.map((row, i) => (
                            <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
                                <td>{String(i + 1).padStart(2, '0')}</td>
                                <td>{new Date(row.created_at).toLocaleDateString('id-ID')}</td>
                                <td>{row.user?.nama || '-'}</td>
                                <td>{row.user?.kota || '-'}</td>
                                <td>{hitungUmur(row.user?.birthdate)}</td>
                                <td className="flex justify-center items-center h-full">
                                    <label htmlFor={`detail-modal-${row.id}`} className="cursor-pointer">
                                        <FaEye className="text-sky-500 text-lg" />
                                    </label>

                                    {/* Modal */}
                                    <input type="checkbox" id={`detail-modal-${row.id}`} className="modal-toggle" />
                                    <div className="modal" role="dialog">
                                        <div className="modal-box">
                                            <div className='flex justify-between'>
                                                <h3 className="font-bold text-lg">Detail Pelamar</h3>
                                                <label htmlFor={`detail-modal-${row.id}`} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-xl">✕</label>
                                            </div>
                                            <hr className='my-3' />
                                            <p className='mb-2'><strong>Nama:</strong> {row.user?.nama}</p>
                                            <p className='mb-2'><strong>Kota:</strong> {row.user?.kota}</p>
                                            <p className='mb-2'><strong>Status:</strong> {row.status}</p>
                                            <p className='mb-2'><strong>Alasan:</strong></p>
                                            {row.status === 'Menunggu' ? (
                                                <textarea
                                                    className="textarea textarea-bordered w-full"
                                                    placeholder="Tulis alasan penolakan di sini"
                                                    value={alasanInputs[row.id] || ''}
                                                    onChange={(e) =>
                                                        setAlasanInputs((prev) => ({
                                                            ...prev,
                                                            [row.id]: e.target.value
                                                        }))
                                                    }
                                                />
                                            ) : (
                                                <p className="text-gray-700">{row.alasan || '-'}</p>
                                            )}

                                            <div className="modal-action">
                                                <button
                                                    className="btn px-8 rounded-full bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                                                    disabled={row.status !== 'Menunggu'}
                                                    onClick={() => handleReject(row.id)}
                                                >
                                                    Tolak
                                                </button>
                                                <button
                                                    className="btn px-8 rounded-full bg-sky-400 text-white hover:bg-sky-500 disabled:opacity-50"
                                                    disabled={row.status !== 'Menunggu'}
                                                    onClick={() => handleAccept(row.id)}
                                                >
                                                    Terima
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabelSertifikasi
