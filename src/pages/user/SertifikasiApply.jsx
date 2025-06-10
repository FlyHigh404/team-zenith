import { useParams } from 'react-router-dom'
import dataSertifikasi from '../../data/sertifikasi'
import SertifikasiInfo from '../../components/SertifikasiInfo'
import SertifikasiForm from '../../components/SertifikasiForm'

const SertifikasiApply = () => {
  const { id } = useParams()
  const selected = dataSertifikasi.find((item) => item.id === parseInt(id))

  if (!selected) return <p>Sertifikasi tidak ditemukan.</p>

  return (
    <div className="flex gap-10 px-10 py-8 bg-[#F5F5F5] min-h-screen">
      {/* KIRI – Sidebar Info Sertifikasi */}
      <SertifikasiInfo selected={selected} />

      {/* KANAN – Form Pendaftaran */}
      <SertifikasiForm selected={selected} />
    </div>
  )
}

export default SertifikasiApply
