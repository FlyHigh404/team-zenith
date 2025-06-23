import React, { useEffect, useState } from 'react'
import { FaCalendar, FaClock, FaLocationDot, FaToolbox, FaBookmark } from 'react-icons/fa6'
import img from '../assets/img/sertifikasi.png'

const SertifikasiSimpan = () => {
  const [savedItems, setSavedItems] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedItems')) || []
    setSavedItems(stored)
  }, [])

  const handleRemoveBookmark = (id) => {
    const updated = savedItems.filter((item) => item.id !== id)
    localStorage.setItem('savedItems', JSON.stringify(updated))
    setSavedItems(updated)
  }

  return (
    <div className="bg-white rounded-xl shadow-md lg:mx-10 md:mx-14">
      <div className="px-6 md:px-10 py-4 w-full space-y-3">
        <h1 className="font-semibold">Sertifikasi yang Disimpan</h1>

        {savedItems.length === 0 ? (
          <p className="text-gray-500">Belum ada sertifikasi yang disimpan.</p>
        ) : (
          <div className="space-y-4">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-white px-6 py-4 rounded-xl shadow-sm flex flex-col gap-2">
                <div className="flex gap-3 items-start">
                  <img src={img} alt="" className="w-10 h-10 object-contain" />
                  <div>
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.bidang} - {item.keahlian}
                    </p>
                  </div>
                  <button onClick={() => handleRemoveBookmark(item.id)} className="ml-auto" title="Hapus dari bookmark">
                    <FaBookmark />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:gap-10 gap-4 mt-2 text-base text-gray-700">
                  {' '}
                  {/* justify-between */}
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-gray-400" />
                    <span>{item.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-gray-400" />
                    <span>{item.waktu}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaLocationDot className="text-gray-400" />
                    <span>{item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaToolbox className="text-gray-400" />
                    <span>{item.metode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SertifikasiSimpan
