import DataSertifikasi from '../../components/DataSertifikasi'
import ListSertifikasi from '../../components/ListSertifikasi'

const SertifikasiAdmin = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="p-4 sm:ml-64 ">
        <DataSertifikasi />
        <ListSertifikasi />
      </div>
    </div>
  )
}

export default SertifikasiAdmin
