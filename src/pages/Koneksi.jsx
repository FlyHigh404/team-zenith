import React from 'react'
import SidebarProfil from '../components/SidebarProfil'
import ListKoneksi from '../components/ListKoneksi'

const Koneksi = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col lg:flex-row gap-5 h-full overflow-y-auto">
      <div className="w-full lg:w-[25%] hidden md:flex flex-col justify-start lg:pl-20 mt-4">
        <SidebarProfil />
      </div>
      <div className="w-full min-h-screen lg:w-[70%] flex flex-col justify-start gap-2 mt-4">
        <ListKoneksi />
      </div>
    </div>
  )
}

export default Koneksi
