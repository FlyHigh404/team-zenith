import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaClock, FaLocationDot, FaToolbox, FaBuilding, FaPeopleCarryBox } from 'react-icons/fa6'

const SertifikasiInfo = ({ selected }) => {
  const navigate = useNavigate()

  if (!selected) return <p>Sertifikasi tidak ditemukan.</p>

  return (
    <div className="w-80">
      <button onClick={() => navigate(-1)} className="text-black text-base font-medium flex items-center mb-4">
        <FaArrowLeft className="mr-2" /> Detail Sertifikasi
      </button>

      <div className="bg-white rounded-xl shadow-md">
        <div className="bg-[#86CEEB] py-4 px-6 rounded-lg">
          <div className="flex gap-3">
            <div className="text-white">
              <h2 className="font-bold">{selected.title}</h2>
              <p className="text-sm">{selected.lokasi}</p>
            </div>
          </div>
        </div>
        <div className="text-base space-y-3 text-gray-700 bg-white py-4 px-6 rounded-xl shadow-md">
          <div className="flex gap-4 text-[#424242]">
            <FaClock className="mt-1" />
            <div>
              <p className="text-sky-400 font-semibold">Tanggal</p>
              <p>{selected.tanggal}</p>
            </div>
          </div>
          <div className="flex gap-4 text-[#424242]">
            <FaLocationDot className="mt-1" />
            <div>
              <p className="text-sky-400 font-semibold">Waktu</p>
              <p>{selected.waktu}</p>
            </div>
          </div>
          <div className="flex gap-4 text-[#424242]">
            <FaToolbox className="mt-1" />
            <div>
              <p className="text-sky-400 font-semibold">Lokasi</p>
              <p>{selected.lokasi}</p>
            </div>
          </div>
          <div className="flex gap-4 text-[#424242]">
            <FaBuilding className="mt-1" />
            <div>
              <p className="text-sky-400 font-semibold">Metode</p>
              <p>{selected.metode}</p>
            </div>
          </div>
          <div className="flex gap-4 text-[#424242]">
            <FaPeopleCarryBox className="mt-1" />
            <div>
              <p className="text-sky-400 font-semibold">Bidang</p>
              <p>{selected.bidang}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SertifikasiInfo
