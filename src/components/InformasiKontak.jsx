import { FaPhone, FaEnvelope } from 'react-icons/fa6'
import { getUserData } from '../utils/token'

const InformasiKontak = () => {
  const userData = getUserData()

  if (!userData) {
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col border-gray-300 border rounded-2xl bg-white px-4 py-2 gap-4 font-sans">
      <div className="flex flex-col">
        <h2 className="font-semibold text-base">Informasi Kontak</h2>
        <p className="text-gray-800 text-sm">Hubungi saya melalui opsi di bawah ini</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-3">
          <FaPhone />
          <p className="text-sm">{userData.notelp}</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <FaEnvelope />
          <p className="text-sm">{userData.email}</p>
        </div>
      </div>
    </div>
  )
}

export default InformasiKontak
