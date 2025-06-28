import DataPekerjaan from '../../components/DataPekerjaan'
import ListPekerjaan from '../../components/ListPekerjaan'

const PekerjaanAdmin = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="p-4 sm:ml-64 ">
        <DataPekerjaan />
        <ListPekerjaan />
      </div>
    </div>
  )
}

export default PekerjaanAdmin
