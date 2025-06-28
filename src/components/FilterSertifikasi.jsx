import { useState } from 'react'
import { fetchSertifikasi } from '../api/forum'

const FilterSertifikasi = ({ filter, onChange }) => {
  const [dataSertifikasi, setDataSertifikasi] = useState([])
  const jenisOptions = ['BNSP', 'EBTKE', 'Migas', 'ABS', 'Kem. Ketenagakerjaan RI', 'Disnaker']
  const bidangOptions = ['Inspeksi', 'Pengelasan']
  const lokasiOptions = ['Online', 'On-site']

  const fetchData = async () => {
    try {
      const data = await fetchSertifikasi()
      setDataSertifikasi(data)
    } catch (error) {
      console.error('Gagal mengambil data sertifikasi:', error)
    }
  }
  useState(() => {
    fetchData()
  }, [])
  return (
    <div className="bg-white p-5 rounded-xl w-75">
      <div className="flex justify-between px-3">
        <p className="font-semibold">
          Filter <span>({dataSertifikasi.length})</span>
        </p>
      </div>
      <hr className="my-5 px-3 text-[#D2D2D2] w-60 mx-auto" />
      <div className="my-5 px-3">
        <p className="my-3 font-semibold">Jenis Sertifikasi</p>
        <div className="space-y-2">
          {jenisOptions.map((jenis) => (
            <label key={jenis} className="flex items-center gap-2">
              <input type="checkbox" checked={filter.jenis.includes(jenis)} onChange={() => onChange('jenis', jenis)} className="checkbox checkbox-primary border-gray-300 " />
              {jenis}
            </label>
          ))}
        </div>
      </div>
      <div className="my-5 px-3">
        <p className="my-3 font-semibold">Bidang</p>
        <div className="space-y-2">
          {bidangOptions.map((bidang) => (
            <label key={bidang} className="flex items-center gap-2">
              <input type="checkbox" checked={filter.bidang.includes(bidang)} onChange={() => onChange('bidang', bidang)} className="checkbox checkbox-primary border-gray-300 " />
              {bidang}
            </label>
          ))}
        </div>
      </div>
      <div className="my-5 px-3">
        <p className="my-3 font-semibold">Lokasi</p>
        <div className="space-y-2">
          {lokasiOptions.map((lokasi) => (
            <label key={lokasi} className="flex items-center gap-2">
              <input type="checkbox" checked={filter.lokasi.includes(lokasi)} onChange={() => onChange('lokasi', lokasi)} className="checkbox checkbox-primary border-gray-300 " />
              {lokasi}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterSertifikasi
