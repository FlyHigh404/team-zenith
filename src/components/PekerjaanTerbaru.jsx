import { useEffect, useState } from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { jobList } from '../api/beranda'

const PekerjaanTerbaru = () => {
  const [lokerData, setLokerData] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLoker(1)
  }, [])

  const fetchLoker = async (page) => {
    setLoading(true)
    try {
      const res = await jobList(page)
      const newLoker = (res.data?.data || []).map((loker) => ({
        id: loker.id,
        name: loker.judul,
        company: loker.perusahaan?.nama || '-',
        provinsi: loker.provinsi || '-',
        kota: loker.kota || '-',
        pengalaman: loker.pengalaman_format || '-',
        durasi_bulan: loker.durasi_bulan || '-',
      }))
      setLokerData((prev) => {
        const ids = new Set(prev.map((l) => l.id))
        return [...prev, ...newLoker.filter((l) => !ids.has(l.id))]
      })
      setNextUrl(res.data?.next_page_url)
    } catch (error) {
      console.error('Gagal mengambil data lowongan:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!nextUrl) return
    const url = new URL(nextUrl)
    const page = url.searchParams.get('page')
    fetchLoker(page)
  }
  return (
    <div className="flex flex-col gap-0 font-sans">
      <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3">
        <h2 className="font-semibold text-base">Pekerjaan Terbaru</h2>
      </div>

      <div className="flex flex-col border-gray-300 border border-t-0 bg-white px-4 py-3 gap-4">
        {lokerData.map((loker) => (
          <NavLink key={loker.id} to="#detail-pekerjaan" className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{loker.name}</p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {loker.company} | {loker.kota}, {loker.provinsi} | Durasi {loker.durasi_bulan} bulan | Pengalaman {loker.pengalaman}
                </p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              <button className="cursor-pointer">
                <FaAngleRight />
              </button>
            </div>
          </NavLink>
        ))}

        {nextUrl && (
          <button className="mt-2 px-4 py-2 rounded-lg bg-[#86CEEB] text-white font-semibold hover:bg-sky-500" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Memuat...' : 'Lihat Lebih Banyak'}
          </button>
        )}
      </div>
    </div>
  )
}

export default PekerjaanTerbaru
