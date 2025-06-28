// src/components/Lamaran.jsx
import React from 'react'

const Lamaran = ({ logo, posisi, perusahaan, apply, status, alasan }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center bg-white mt-4">
            <img
                src={logo || '/default-logo.png'}
                alt="Logo"
                className="w-14 h-14 object-contain"
            />
            <div className="flex-1">
                <p className="font-semibold text-base">{perusahaan}</p>
                <p className="font-medium text-sm">{posisi}</p>
                <p className="text-sm text-gray-400">{apply}</p>
                {(status !== 'dilamar' && status !== 'menunggu') && (
                    <p className="text-sm text-gray-400">Alasan: {alasan}</p>
                )}
            </div>
            <span
                className={`text-xs px-5 py-2 rounded-full font-medium capitalize ${status === 'diterima'
                    ? 'bg-green-100 text-green-700'
                    : status === 'ditolak'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
            >
                {status}
            </span>
        </div>
    )
}

export default Lamaran
