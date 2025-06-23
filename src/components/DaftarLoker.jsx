import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchLoker } from '../api/forum'
import { FaRegBookmark, FaBookmark, FaToolbox, FaHardHat, FaMapMarkerAlt, FaMoneyBill } from 'react-icons/fa'
import noImg from '../assets/img/logo.png'

const DaftarLoker = () => {
  const [lokerList, setLokerList] = useState([])
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchLoker()
        setLokerList(res.data)
      } catch (error) {
        setLokerList([])
        console.error('Gagal mengambil data lowongan:', error)
      }
    }
    getData()
    setSavedJobs(JSON.parse(localStorage.getItem('savedJobs')) || [])
  }, [])

  const isBookmarked = (id) => savedJobs.some((data) => data.id === id)
  const toggleBookmark = (data) => {
    let updated
    if (isBookmarked(data.id)) {
      updated = savedJobs.filter((d) => d.id !== data.id)
    } else {
      updated = [...savedJobs, data]
    }
    setSavedJobs(updated)
    localStorage.setItem('savedJobs', JSON.stringify(updated))
  }

  if (!lokerList.length) return <div className="text-center p-10">Memuat data lowongan...</div>

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lokerList.map((data) => {
        let badges = []
        try {
          badges = data.jenisIndustri ? JSON.parse(data.jenisIndustri) : []
        } catch {
          badges = []
        }

        const logoUrl = data.perusahaan?.logo ? `${import.meta.env.VITE_BASE_URL}/storage/${data.perusahaan.logo}` : noImg

        return (
          <div key={data.id} className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col border border-gray-100">
            <div className="flex items-center gap-3 px-5 pt-5">
              <img src={logoUrl} className="h-12 w-12 rounded-lg object-cover border" alt="Logo Perusahaan" onError={(e) => (e.target.src = noImg)} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{data.perusahaan?.nama || '-'}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <FaMapMarkerAlt className="inline-block" /> {data.lokasi || data.kota || '-'}
                </div>
              </div>
              <button onClick={() => toggleBookmark(data)} className="text-lg">
                {isBookmarked(data.id) ? <FaBookmark className="text-blue-400" /> : <FaRegBookmark />}
              </button>
            </div>
            <Link to={`/loker/${data.id}`} className="block flex-1 p-5 pt-2">
              <h1 className="font-bold text-base mb-1 line-clamp-2">{data.judul}</h1>
              <div className="flex flex-wrap gap-2 mb-2">
                {badges.map((ind, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-600 text-xs font-medium rounded-xl px-3 py-0.5 border border-blue-100">
                    {ind}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <div className="flex gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaHardHat /> {data.durasi_kategori || `${data.durasi_bulan} bulan`}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaToolbox /> {data.pengalaman_format || `${data.pengalaman} tahun`}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <FaMoneyBill /> Rp {data.gaji?.toLocaleString('id-ID')}
                </span>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>Mulai: {data.tanggalMulai && new Date(data.tanggalMulai).toLocaleDateString('id-ID')}</span>
                  <span>Selesai: {data.tanggalSelesai && new Date(data.tanggalSelesai).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-3 mb-2">{data.desc}</p>
              <ul className="list-disc list-inside mt-2 text-xs text-gray-600 space-y-1">
                {data.kualifikasi
                  .split('\n')
                  .map((q) => q.replace(/^- /, '').trim())
                  .filter(Boolean)
                  .map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
              </ul>
              <span className="text-xs text-gray-400">Dibuat pada: {data.createdAt && new Date(data.createdAt).toLocaleDateString('id-ID')}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default DaftarLoker
