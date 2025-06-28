import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSertifikasiById } from '../../api/forum'
import SertifikasiInfo from '../../components/SertifikasiInfo'
import SertifikasiForm from '../../components/SertifikasiForm'

const SertifikasiApply = () => {
  const { id } = useParams()
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSertifikasiById(id)
        setSelected({
          ...data,
          title: data.judul,
          keahlian: data.jenisSertifikat,
          tanggal: `${new Date(data.tanggalMulai).toLocaleDateString()} - ${new Date(data.tanggalSelesai).toLocaleDateString()}`,
          waktu: `${new Date(data.jamMulai).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(data.jamSelesai).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          sertifikat: [data.sertifikatDidapat],
          syarat:
            data.syaratPeserta
              ?.split('\n')
              .map((s) => s.replace(/^- /, ''))
              .filter(Boolean) || [],
          fasilitas:
            data.fasilitas
              ?.split('\n')
              .map((f) => f.replace(/^- /, ''))
              .filter(Boolean) || [],
        })
      } catch {
        setSelected(null)
      }
      setLoading(false)
    }
    getData()
  }, [id])

  if (loading) return <p className="p-10">Memuat data sertifikasi...</p>
  if (!selected) return <p className="p-10">Sertifikasi tidak ditemukan.</p>

  return (
    <div className="flex gap-10 px-10 py-8 bg-[#F5F5F5] min-h-screen">
      <SertifikasiInfo selected={selected} />
      <SertifikasiForm selected={selected} />
    </div>
  )
}

export default SertifikasiApply
