import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import Lamaran from '../../components/Lamaran'
import logoPerusahaan from '../../assets/img/logo.png'

const SemuaLamaran = () => {
  const [tab, setTab] = useState('semua')

  const lamaranData = [
    { id: 1, posisi: 'Welder', perusahaan: 'CV Rinjani Sinergi Indonesia', apply: 'Dikirim 24 Februari 2025', status: 'diterima', logo: logoPerusahaan },
    { id: 2, posisi: 'Inspector', perusahaan: 'PT Jaya Abadi', apply: 'Dikirim 24 Februari 2025', status: 'ditolak', logo: logoPerusahaan },
    { id: 3, posisi: 'Painter', perusahaan: 'PT Warna Sejahtera', apply: 'Dikirim 24 Februari 2025', status: 'dilamar', logo: logoPerusahaan },
    { id: 4, posisi: 'Welder', perusahaan: 'CV Rinjani Sinergi Indonesia', apply: 'Dikirim 24 Februari 2025', status: 'dilamar', logo: logoPerusahaan },
  ]

  const filteredLamaran = lamaranData.filter((item) => {
    if (tab === 'semua') return true
    return item.status === tab
  })

  const tabList = ['semua', 'dilamar', 'diterima', 'ditolak']

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header / Navigasi Kembali */}
      <div className="px-10 py-3">
        <div className="bg-white w-full p-4 rounded-xl">
          <a href="/beranda-user" className="text-black text-base font-medium flex items-center">
            <FaArrowLeft className="mr-2 text-black" /> <span className="text-black">Beranda</span>
          </a>
        </div>
      </div>

      {/* Konten */}
      <div className="px-10 py-4">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-[30%] bg-white rounded-xl shadow px-4 py-2 h-fit">
            {tabList.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setTab(kategori)}
                className={`w-full text-left capitalize py-2 px-4 rounded-lg font-medium ${tab === kategori
                  ? 'text-[#86CEEB] font-semibold bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {kategori}
              </button>
            ))}
          </div>

          {/* Konten Lamaran */}
          <div className="w-[70%] space-y-4">
            <div className='bg-white rounded-xl shadow-md px-4 py-2'>
              <h1 className="text-xl font-semibold mb-2">Riwayat Lamaran Saya</h1>
              {filteredLamaran.length === 0 ? (
                <p className="text-gray-500 text-sm">Tidak ada lamaran pada kategori ini.</p>
              ) : (
                filteredLamaran.map((item) => (
                  <Lamaran
                    logo={item.logo}
                    key={item.id}
                    posisi={item.posisi}
                    perusahaan={item.perusahaan}
                    apply={item.apply}
                    status={item.status}
                  />
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SemuaLamaran
