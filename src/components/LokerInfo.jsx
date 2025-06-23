import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaStar, FaUsers, FaClock, FaLocationDot, FaToolbox, FaSackDollar } from 'react-icons/fa6'
import { fetchLokerById } from '../api/forum'
import imgDefault from '../assets/img/sertifikasi.png' // placeholder jika tidak ada logo

const LokerInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchLokerById(id)
      .then(setJob)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Memuat info loker...</p>
  if (!job) return <p>Loker tidak ditemukan.</p>

  return (
    <div className="md:w-80 w-full">
      <button onClick={() => navigate(-1)} className="text-black text-base font-medium flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Detail pekerjaan
      </button>
      <div className="bg-white rounded-xl shadow-md">
        <div className="bg-[#86CEEB]  py-4 px-6 rounded-lg mb-4">
          <div className="flex gap-3">
            <img src={job.perusahaan?.logo ? `${import.meta.env.VITE_BASE_URL}/storage/${job.perusahaan.logo}` : imgDefault} className="w-12 h-12 object-contain rounded-full bg-white" alt="Logo Perusahaan" />
            <div className="text-white">
              <h2 className="font-bold">{job.perusahaan?.nama || '-'}</h2>
              <p className="text-sm">{job.lokasi || job.kota || '-'}</p>
            </div>
          </div>
          <div className="flex justify-between my-3">
            <button className="btn btn-white px-auto w-33 rounded-full text-blue-600">Ikuti</button>
            <button className="btn btn-outline-white bg-transparent px-auto w-33 rounded-full text-white">Kirim Email</button>
          </div>
        </div>
        <div className="mb-4 py-2 px-6 text-base text-gray-700 space-y-3">
          <div className="flex gap-2">
            <FaStar />{' '}
            <p>
              {job.perusahaan?.rating ?? '0'} . {job.perusahaan?.jumlahUlasan ?? 0} ulasan
            </p>
          </div>
          <div className="flex gap-2">
            <FaUsers /> <p>{job.perusahaan?.jumlahPegawai ? `${job.perusahaan.jumlahPegawai} Pegawai` : '-'}</p>
          </div>
          <hr className="border-0.3 text-[#D2D2D2]" />
          <p className="text-justify pb-6">{job.perusahaan?.deskripsi}</p>
        </div>
      </div>
      <div className="mt-4 text-base space-y-3 text-gray-700 bg-white py-4 px-6 rounded-xl shadow-md">
        <div>
          <p className="font-semibold">{job.judul}</p>
        </div>
        <hr className="border-0.3 text-[#D2D2D2]" />
        <div className="flex gap-4 text-[#424242]">
          <FaClock className="mt-1" />
          <div>
            <p className="text-sky-400 font-semibold">Durasi</p>
            <p>{job.durasi_kategori || `${job.durasi_bulan} bulan`}</p>
          </div>
        </div>
        <div className="flex gap-4 text-[#424242]">
          <FaLocationDot className="mt-1" />
          <div>
            <p className="text-sky-400 font-semibold">Lokasi</p>
            <p>{job.lokasi || job.kota || '-'}</p>
          </div>
        </div>
        <div className="flex gap-4 text-[#424242]">
          <FaToolbox className="mt-1" />
          <div>
            <p className="text-sky-400 font-semibold">Pengalaman</p>
            <p>{job.pengalaman_format || `${job.pengalaman} tahun`}</p>
          </div>
        </div>
        <div className="flex gap-4 text-[#424242]">
          <FaSackDollar className="mt-1" />
          <div>
            <p className="text-sky-400 font-semibold">Gaji</p>
            <p>{job.gaji ? job.gaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }) : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LokerInfo
