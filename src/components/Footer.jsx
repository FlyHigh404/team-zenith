import React from 'react'
import { FaLinkedin, FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";


function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#86CEEB] dark:bg-[#2F4852] text-base-content pt-10 pb-2">
      <div className='text-sky-950 dark:text-sky-100 grid md:grid-cols-3 gap-10 text-justify lg:mx-14 md:mx-10 mx-5'>
        <div className='space-y-3'>
          <h1 className='text-2xl font-semibold'>UNEDO</h1>
          <p className='text-sm '>UNEDO adalah platform profesional untuk industri pengelasan yang mempertemukan welder dengan perusahaan. Kami hadir untuk mendukung karier, koneksi, dan perkembangan keahlian di dunia welding.</p>
          <div className='flex gap-2 text-3xl'>
            <FaLinkedin />
            <FaFacebookSquare />
            <FaTwitterSquare />
            <FaWhatsappSquare />
          </div>
        </div>
        <div className='md:mx-auto'>
          <h1 className='text-base font-semibold'>Navigasi Cepat</h1>
          <nav className='mt-3'>
            <ol className='space-y-2'>
              <li className='text-sm hover:underline'><a href="#tentang">Tentang Perusahaan</a></li>
              <li className='text-sm hover:underline'><a href="#kegunaan">Kegunaan</a></li>
              <li className='text-sm hover:underline'><a href="#keunggulan">Keunggulan</a></li>
              <li className='text-sm hover:underline'><a href="#carapendaftaran">Cara Pendaftaran</a></li>
            </ol>
          </nav>
        </div>
        <div className='mx-auto space-y-3'>
          <h1 className='text-base font-semibold'>Kontak Kami</h1>
          <p className='text-sm'>(+62) 810 9924 545</p>
          <p className='text-sm'>www.unedo.com</p>
          <p className='text-sm'>unedo@gmail.com</p>
          <p className='text-sm'>Jl. Suka Karya Asih No. 41, Kota Parahyangan, Indonesia</p>
        </div>
      </div>
      <hr className="border-sky-950 dark:border-sky-100 border-2 border-dashed my-6" />
      <div className='lg:mx-14 md:mx-10 mx-5 md:flex md:justify-between'>
        <p className='text-sky-950 dark:text-sky-100 font-semibold text-sm lg:text-base'>Copyright &copy; {year} UNEDO. Semua Hak Dilindungi</p>
        <p className='text-sky-950 dark:text-sky-100 font-semibold text-sm lg:text-base'>Syarat & Ketentuan | Kebijakan Privasi </p>
      </div>

    </footer>
  )
}

export default Footer
