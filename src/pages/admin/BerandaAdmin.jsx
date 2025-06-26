import LokerAktif from '../../components/LokerAktif'
import PenggunaAktif from '../../components/PenggunaAktif'
import Postingan from '../../components/Postingan'
import SidebarProfil from '../../components/SidebarProfil'
import TambahPostingan from '../../components/TambahPostingan'
import ScrollToTopButton from '../../components/ScrollToTopButton'

const BerandaAdmin = () => {
  return (
    <div className="bg-[#F5F5F5] flex flex-col lg:flex-row gap-5 h-full overflow-y-auto">
      <div className="w-full lg:w-[25%] hidden md:flex flex-col justify-start lg:pl-20 mt-4">
        <SidebarProfil />
      </div>
      <div className=" w-full lg:w-[46%] flex flex-col justify-start gap-2 mt-4">
        <TambahPostingan />
        <Postingan />
      </div>
      <div className=" w-full lg:w-[29%] flex flex-col justify-start lg:pr-20 gap-4 mt-4">
        <LokerAktif />
        <PenggunaAktif />
      </div>
      <ScrollToTopButton />
    </div>
  )
}

export default BerandaAdmin
