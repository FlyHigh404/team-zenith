import { FaArrowLeft } from 'react-icons/fa6'
import Tersimpan from '../../components/Tersimpan'
import Postingan from '../../components/PostinganSimpan'

const SimpanPostingan = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="px-10 py-3">
        <div className="bg-white w-full p-4 rounded-xl">
          <a href="/beranda-admin" className="text-black text-base font-medium flex items-center">
            <FaArrowLeft className="mr-2 text-black" /> <span className="text-black">Beranda</span>
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row my-5 gap-4 px-4 md:px-10">
        <div className="w-full md:w-[30%]">
          <Tersimpan />
        </div>
        <div className="w-full md:w-[70%]">
          <Postingan />{' '}
        </div>
      </div>
    </div>
  )
}

export default SimpanPostingan
