import React, { useEffect, useState } from 'react'
import { FaBookmark, FaHardHat } from 'react-icons/fa'
import { FaClock, FaToolbox } from 'react-icons/fa6'
import img from '../assets/img/sertifikasi.png'

const Pekerjaan = () => {
  const [savedJobs, setSavedJobs] = useState([])

  const handleRemoveBookmark = (id) => {
    removeBookmark(id)
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs')) || []
    setSavedJobs(saved)
  }, [])

  const removeBookmark = (id) => {
    const updated = savedJobs.filter((job) => job.id !== id)
    setSavedJobs(updated)
    localStorage.setItem('savedJobs', JSON.stringify(updated))
  }

  return (
    <div className="bg-white rounded-xl shadow-md lg:mx-14 md:mx-14 mx-5">
      <div className="px-6 md:px-10 py-4 w-full space-y-3">
        <h1 className="font-semibold">Pekerjaan yang Disimpan</h1>

        {savedJobs.length === 0 ? (
          <p className="text-gray-500">Belum ada lowongan yang disimpan.</p>
        ) : (
          savedJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center mb-3 hover:shadow-sm transition">
              <img src={img} alt="Logo" className="w-14 h-14 object-contain" />
              <div className="flex-1">
                <p className="font-semibold text-base">{job.company}</p>
                <p className="font-medium text-sm">{job.position}</p>
                <p className="text-gray-400 text-sm">{job.location}</p>
              </div>
              <button onClick={() => handleRemoveBookmark(job.id)} className="ml-auto" title="Hapus dari bookmark">
                <FaBookmark />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Pekerjaan
