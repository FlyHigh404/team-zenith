import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchLokerById } from '../../api/forum'
import { getUserData } from '../../utils/token'
import LokerInfo from '../../components/LokerInfo'

const DetailLoker = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUserData()
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchLokerById(id)
        setJob(data)
      } catch {
        setJob(null)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [id])

  if (loading) return <div className="p-10">Memuat detail lowongan...</div>
  if (!job) return <div className="p-10 text-red-600">Lowongan tidak ditemukan.</div>

  // Kualifikasi jadi list
  const kualifikasiList = job.kualifikasi
    ? job.kualifikasi
      .split('\n')
      .map((q) => q.replace(/^- /, '').trim())
      .filter(Boolean)
    : []

  // Detail teknis, jika ada
  let detail = []
  try {
    detail = job.detail ? Object.values(typeof job.detail === 'string' ? JSON.parse(job.detail) : job.detail).flat() : []
  } catch {
    detail = []
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 px-4 md:px-10 py-8 bg-[#F5F5F5] min-h-screen">
      {/* KIRI – Sidebar */}
      <LokerInfo job={job} />

      {/* KANAN – Konten Utama */}
      <div className="md:w-2/3 w-full bg-white p-4 rounded-lg md:mt-10 shadow">
        <h1 className="text-2xl font-bold mb-6">{job.judul}</h1>

        <div className="mb-6 text-gray-600 text-sm flex flex-wrap gap-x-6 gap-y-2">
          <span>
            <b>Perusahaan:</b> {job.perusahaan?.nama}
          </span>
          <span>
            <b>Lokasi:</b> {job.lokasi || job.kota}
          </span>
          <span>
            <b>Gaji:</b> Rp {job.gaji?.toLocaleString('id-ID')}
          </span>
          <span>
            <b>Durasi:</b> {job.durasi_kategori || `${job.durasi_bulan} bulan`}
          </span>
        </div>

        <h2 className="text-lg font-semibold mb-1">Deskripsi Pekerjaan</h2>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed text-justify">{job.desc}</p>

        {detail.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-1">Detail Teknis / Keahlian</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {detail.map((item, idx) => (
                <span key={idx} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs">
                  {item}
                </span>
              ))}
            </div>
          </>
        )}

        <h2 className="text-lg font-semibold mb-1">Kualifikasi</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-6">
          {kualifikasiList.length > 0 ? (
            kualifikasiList.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li>Tidak ada kualifikasi khusus.</li>
          )}
        </ul>

        <Link to={`/loker/apply/${job.id}`}>
          <button
            className={`px-6 py-2 rounded-xl text-sm text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isAdmin}
          >
            Lamar Pekerjaan
          </button>
        </Link>
      </div>
    </div>
  )
}

export default DetailLoker
