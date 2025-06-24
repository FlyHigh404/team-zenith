import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchSertifikasi } from '../api/forum'
import { getUserData } from '../utils/token'
import { FaClock, FaToolbox, FaCalendar, FaLocationDot, FaRegBookmark, FaBookmark, FaShare } from 'react-icons/fa6'

const DaftarSertifikasi = ({ filter }) => {
  const [dataSertifikasi, setDataSertifikasi] = useState([])
  const [selected, setSelected] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  const user = getUserData()
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSertifikasi()
        const mapped = data.map((item) => ({
          ...item,
          tanggal: `${new Date(item.tanggalMulai).toLocaleDateString()} - ${new Date(item.tanggalSelesai).toLocaleDateString()}`,
          waktu: `${new Date(item.jamMulai).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.jamSelesai).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          title: item.judul,
          keahlian: item.jenisSertifikat,
          sertifikat: [item.sertifikatDidapat],
          syarat: item.syaratPeserta.split('\n').map((s) => s.replace(/^- /, '')).filter(Boolean),
          fasilitas: item.fasilitas.split('\n').map((f) => f.replace(/^- /, '')).filter(Boolean),
        }))
        setDataSertifikasi(mapped)
        setSelected(mapped[0])
      } catch (error) {
        setDataSertifikasi([])
        console.error('Gagal mengambil data sertifikasi:', error)
      }
    }
    fetchData()
  }, [refresh])

  const filteredData = dataSertifikasi.filter((item) => {
    if (filter.jenis.length > 0 && !filter.jenis.some((jenis) => (item.keahlian || '').toLowerCase().includes(jenis.toLowerCase()))) {
      return false
    }
    if (filter.bidang.length > 0 && !filter.bidang.includes(item.bidang)) {
      return false
    }
    if (filter.lokasi.length > 0) {
      const metode = (item.metode || '').toLowerCase()
      if (filter.lokasi.includes('Online') && metode === 'online') return true
      if (filter.lokasi.includes('On-site') && metode !== 'online') return true
      return false
    }
    return true
  })

  if (!selected) {
    return <div className="p-6">Memuat data sertifikasi...</div>
  }

  const DetailContent = ({ data }) => (
    <div>
      <div className="flex gap-3 mb-2">
        <div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{data.bidang} - {data.keahlian}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 space-y-2 justify-between my-2 text-xs">
        <div className="flex items-center"><FaCalendar className="text-gray-400 mr-1" />{data.tanggal}</div>
        <div className="flex items-center"><FaClock className="text-gray-400 mr-1" />{data.waktu}</div>
        <div className="flex items-center"><FaLocationDot className="text-gray-400 mr-1" />{data.lokasi}</div>
        <div className="flex items-center"><FaToolbox className="text-gray-400 mr-1" />{data.metode}</div>
      </div>

      <h4 className="font-semibold mt-4">Tentang Sertifikasi</h4>
      <p className="text-sm mb-2">{data.deskripsi}</p>

      <h4 className="font-semibold mt-4">Sertifikat yang Didapat</h4>
      <ul className="list-disc list-inside text-sm">{data.sertifikat.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4 className="font-semibold mt-4">Syarat Peserta</h4>
      <ul className="list-disc list-inside text-sm">{data.syarat.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h4 className="font-semibold mt-4">Fasilitas</h4>
      <ul className="list-disc list-inside text-sm">{data.fasilitas.map((f, i) => <li key={i}>{f}</li>)}</ul>

      <div className="mt-4 text-sm">
        <p><strong>Kuota Minimal:</strong> {data.kuota}</p>
        <p><strong>Kuota Pendaftar:</strong> {data.pendaftar}</p>
        <p><strong>Kuota Tersisa:</strong> {data.tersedia}</p>
        <p><strong>Catatan:</strong> {data.catatan}</p>
      </div>

      <div className="flex justify-end mt-4">
        <Link to={`/sertifikasi/apply/${data.id}`}>
          <button className={`px-10 py-2 rounded-xl text-sm text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`} disabled={isAdmin}>Daftar</button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 items-stretch h-full">
      <div className="w-full md:w-1/2 space-y-2 h-full">
        {filteredData.length === 0 && <div className="text-center text-gray-400 py-8">Tidak ada data sertifikasi yang sesuai filter</div>}
        {filteredData.map((item) => {
          const saved = JSON.parse(localStorage.getItem('savedItems')) || []
          const isBookmarked = saved.some((i) => i.id === item.id)

          const handleToggleBookmark = (e) => {
            e.stopPropagation()
            let updated
            if (isBookmarked) {
              updated = saved.filter((i) => i.id !== item.id)
            } else {
              updated = [...saved, item]
            }
            localStorage.setItem('savedItems', JSON.stringify(updated))
            setRefresh((r) => !r)
          }

          const handleSelect = () => {
            setSelected(item)
            if (window.innerWidth < 768) setIsMobileModalOpen(true)
          }

          return (
            <div key={item.id} onClick={handleSelect} className={`px-6 py-4 rounded-xl cursor-pointer shadow-sm ${selected.id === item.id ? 'bg-blue-100' : 'bg-white'}`}>
              <div className="flex gap-3 mb-2 items-start">
                <div>
                  <h2 className="font-semibold text-base">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.bidang} - {item.keahlian}</p>
                </div>
                <div className="flex gap-3 ml-auto pt-[2px]">
                  <button onClick={handleToggleBookmark}>{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}</button>
                  <FaShare />
                </div>
              </div>

              <div className="grid grid-cols-2 space-y-2 justify-between my-2">
                <div className="flex"><FaCalendar className="text-gray-400 text-xs mt-1" /><p className="ml-1 text-black text-xs pt-0.5">{item.tanggal}</p></div>
                <div className="flex"><FaClock className="text-gray-400 text-xs mt-1" /><p className="ml-1 text-black text-xs pt-0.5">{item.waktu}</p></div>
                <div className="flex"><FaLocationDot className="text-gray-400 text-xs mt-1" /><p className="ml-1 text-black text-xs pt-0.5">{item.lokasi}</p></div>
                <div className="flex"><FaToolbox className="text-gray-400 text-xs mt-1" /><p className="ml-1 text-black text-sm">{item.metode}</p></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hidden md:block w-full md:w-1/2 border-sky-100 p-4 rounded-lg shadow-sm bg-white h-full">
        <DetailContent data={selected} />
      </div>

      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto p-4 relative">
            <button onClick={() => setIsMobileModalOpen(false)} className="absolute top-2 right-3 text-sm text-gray-500">✕</button>
            <DetailContent data={selected} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DaftarSertifikasi
