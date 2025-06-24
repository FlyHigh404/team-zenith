import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import Lamaran from '../../components/Lamaran'
import logoPerusahaan from '../../assets/img/logo.png'
import { applyJobs, applySertif } from '../../api/apply'

const SemuaLamaran = () => {
  const [tab, setTab] = useState('pekerjaan')
  const [dataLoker, setDataPekerjaan] = useState([])
  const [dataSertifikasi, setDataSertifikasi] = useState([])
  const [, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resJob, resSertif] = await Promise.all([applyJobs(), applySertif()])

        // Ambil dari response.data.data
        setDataPekerjaan(Array.isArray(resJob.data?.data?.data) ? resJob.data.data.data : [])
        setDataSertifikasi(Array.isArray(resSertif.data?.data) ? resSertif.data.data : [])
      } catch (err) {
        console.error('❌ Gagal memuat data lamaran:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const tabList = ['pekerjaan', 'sertifikasi']
  // const currentData = tab === 'Pekerjaan' ? dataLoker : dataSertifikasi

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {/* Header / Navigasi Kembali */}
      <div className="px-10 py-3">
        <div className="bg-white w-full p-4 rounded-xl">
          <a href="/beranda-admin" className="text-black text-base font-medium flex items-center">
            <FaArrowLeft className="mr-2 text-black" /> <span className="text-black">Beranda</span>
          </a>
        </div>
      </div>

      {/* Konten */}
      <div className="px-10 py-4">
        <div className="flex gap-6">
          {/* Sidebar tab */}
          <div className="w-[30%] bg-white rounded-xl shadow px-4 py-2 h-fit">
            {tabList.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setTab(kategori)}
                className={`w-full text-left capitalize py-2 px-4 rounded-lg font-medium ${tab === kategori ? 'text-[#86CEEB] font-semibold bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {kategori}
              </button>
            ))}
          </div>

          {/* Daftar lamaran */}
          <div className="w-[70%] space-y-4">
            <div className="bg-white rounded-xl shadow-md px-4 py-2">
              <h1 className="text-xl font-semibold mb-2">Riwayat Lamaran Saya</h1>
              {tab === 'pekerjaan' && (
                <>
                  <h2 className="text-lg font-semibold mt-4">Lamaran Pekerjaan</h2>
                  {dataLoker.map((item) => (
                    <Lamaran
                      key={item.id}
                      posisi={item.loker?.judul}
                      perusahaan={item.loker?.perusahaan?.nama}
                      apply={`Dikirim ${new Date(item.created_at).toLocaleDateString('id-ID')}`}
                      status={item.status.toLowerCase()}
                      logo={item.loker?.perusahaan?.logo || logoPerusahaan}
                    />
                  ))}
                </>
              )}

              {tab === 'sertifikasi' && (
                <>
                  <h2 className="text-lg font-semibold mt-4">Lamaran Sertifikasi</h2>
                  {dataSertifikasi.map((item) => (
                    <Lamaran
                      key={item.id}
                      posisi={item.admin_certification?.judul}
                      perusahaan={item.admin_certification?.bidang}
                      apply={`Dikirim ${new Date(item.created_at).toLocaleDateString('id-ID')}`}
                      status={item.status.toLowerCase()}
                      logo={
                        item.admin_certification?.gambar
                          ? `${import.meta.env.VITE_BASE_URL}/storage/${item.admin_certification.gambar}`
                          : logoPerusahaan
                      }
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SemuaLamaran
