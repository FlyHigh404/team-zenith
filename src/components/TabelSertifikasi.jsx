import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEye } from "react-icons/fa6"
import { getPelamarSertifikasi } from '../api/sertifikasi'
import { getToken } from '../utils/token'

const TabelSertifikasi = ({ sertifikasiId }) => {
    const [pendaftar, setPendaftar] = useState([])
    const [alasanInputs, setAlasanInputs] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPelamarSertifikasi(sertifikasiId)
                setPendaftar(res.pendaftar) // Pastikan sesuai struktur response kamu
            } catch (err) {
                console.error('Gagal fetch data pelamar:', err)
            }
        }

        if (sertifikasiId) fetchData()
    }, [sertifikasiId])

    const hitungUmur = (tanggalLahir) => {
        const birthDate = new Date(tanggalLahir);
        const today = new Date();
        let umur = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) umur--;
        return umur;
    };

    const handleReject = async (id) => {
        const alasan = alasanInputs[id] || '';
        if (!alasan.trim()) {
            alert('Harap isi alasan terlebih dahulu.');
            return;
        }
        try {
            await updateStatusPelamar(id, 'Ditolak', alasan);
            setPendaftar((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, status: 'Ditolak', alasan } : p
                )
            );
            document.getElementById(`detail-modal-${id}`).checked = false; // Tutup modal (opsional)
            alert(`Pelamar ID ${id} ditolak dengan alasan: ${alasan}`);
        } catch (err) {
            console.error('Gagal menolak pelamar:', err);
        }
    };

    const handleAccept = async (id) => {
        const alasan = alasanInputs[id]?.trim();
        if (!alasan) {
            alert('Harap isi alasan terlebih dahulu sebelum menerima pelamar.');
            return;
        }
        try {
            await updateStatusPelamar(id, 'Diterima', alasan);
            setPendaftar((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, status: 'Diterima', alasan } : p
                )
            );
            document.getElementById(`detail-modal-${id}`).checked = false; // Tutup modal (opsional)
            alert(`Pelamar ID ${id} diterima.`);
        } catch (error) {
            console.error('Gagal menerima pelamar:', error);
        }
    };

    const updateStatusPelamar = async (id, status, alasan = '') => {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/certification-lists/applicants/${id}`, {
            status,
            alasan
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    };

    return (
        <div className='bg-white mx-5 mt-5 p-5 rounded-xl min-h-screen'>
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
                        {pendaftar.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-400 py-4">
                                    Belum ada pelamar.
                                </td>
                            </tr>
                        ) : (
                            pendaftar.map((row, i) => (
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
                                                {/* Header */}
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-bold text-lg">Detail Pelamar</h3>
                                                    <label
                                                        htmlFor={`detail-modal-${row.id}`}
                                                        className="btn btn-sm btn-circle btn-ghost text-xl"
                                                    >
                                                        ✕
                                                    </label>
                                                </div>

                                                <hr className="mb-4" />

                                                {/* Detail Pelamar */}
                                                <div className="space-y-2 text-sm text-gray-700">
                                                    <p><strong>Nama:</strong> {row.user?.nama || '-'}</p>
                                                    <p><strong>Kota:</strong> {row.user?.kota || '-'}</p>
                                                    <p><strong>Status:</strong> {row.status}</p>
                                                    <p><strong>Alasan:</strong></p>

                                                    {/* Textarea jika masih menunggu */}
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
                                                        <p className="text-gray-600 whitespace-pre-line">
                                                            {row.alasan || '-'}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Action Button */}
                                                <div className="modal-action mt-4 flex justify-end gap-2">
                                                    <button
                                                        className="btn px-6 bg-red-100 text-red-700 hover:bg-red-200 rounded-full disabled:opacity-50"
                                                        disabled={row.status !== 'Menunggu'}
                                                        onClick={() => handleReject(row.id)}
                                                    >
                                                        Tolak
                                                    </button>
                                                    <button
                                                        className="btn px-6 bg-sky-400 text-white hover:bg-sky-500 rounded-full disabled:opacity-50"
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabelSertifikasi
