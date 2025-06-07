import React, { useState } from 'react'
import dataSertifikasi from '../data/sertifikasi'

const DaftarSertifikasi = () => {
    const [selected, setSelected] = useState(dataSertifikasi[0]);

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            {/* Kiri: Daftar Sertifikasi */}
            <div className="w-full md:w-1/2 space-y-2">
                {dataSertifikasi.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelected(item)}
                        className={`px-6 py-4 rounded-xl cursor-pointer shadow-sm ${selected.id === item.id ? "bg-blue-100" : "bg-white"
                            }`}
                    >
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">{item.bidang}</p>
                        <div className="text-xs mt-1">
                            📅 {item.tanggal} | ⏰ {item.waktu} | 📍 {item.kota} | {item.lokasi}
                        </div>
                    </div>
                ))}
            </div>

            {/* Kanan: Detail Sertifikasi */}
            <div className="w-full md:w-1/2 border-sky-100 p-4 rounded-lg shadow-sm bg-white">
                <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{selected.bidang}</p>
                <p className="text-sm mb-2">{selected.deskripsi}</p>

                <h4 className="font-semibold mt-4">📜 Sertifikat yang Didapat</h4>
                <ul className="list-disc list-inside text-sm">
                    {selected.sertifikat.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>

                <h4 className="font-semibold mt-4">📝 Syarat Peserta</h4>
                <ul className="list-disc list-inside text-sm">
                    {selected.syarat.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>

                <h4 className="font-semibold mt-4">🎁 Fasilitas</h4>
                <ul className="list-disc list-inside text-sm">
                    {selected.fasilitas.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>

                <div className="mt-4 text-sm">
                    <p><strong>👥 Kuota Minimal:</strong> {selected.kuota}</p>
                    <p><strong>📌 Catatan:</strong> {selected.catatan}</p>
                </div>
            </div>
        </div>
    )
}

export default DaftarSertifikasi
