import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
  ${isScrolled ? 'lg:bg-white/50 lg:backdrop-blur-md lg:shadow-md bg-white dark:bg-[#1D232A]/50' : 'bg-white dark:bg-[#1D232A]'}`}
    >
      <div className="max-w-full mx-auto px-6 md:px-24 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-[#86CEEB] dark:text-[#659BB0]">
          UNEDO
        </a>

        {/* Menu untuk Desktop */}
        <ul className="hidden lg:flex space-x-6 text-gray-700 dark:text-white  font-medium">
          <li className="hover:text-gray-900 dark:hover:text-white dark:hover:underline cursor-pointer text-sm">
            <a href="#tentang">Tentang Perusahaan</a>
          </li>
          <li className="hover:text-gray-900 dark:hover:text-white dark:hover:underline cursor-pointer text-sm">
            <a href="#kegunaan">Kegunaan</a>
          </li>
          <li className="hover:text-gray-900 dark:hover:text-white dark:hover:underline cursor-pointer text-sm">
            <a href="#keunggulan">Keunggulan</a>
          </li>
          <li className="hover:text-gray-900 dark:hover:text-white dark:hover:underline cursor-pointer text-sm">
            <a href="#carapendaftaran">Cara Pendaftaran</a>
          </li>
        </ul>

        {/* Tombol Join Us & Profile (Desktop) */}
        <div className="hidden lg:flex space-x-4">
          <a href="/login">
            <button className="px-8 py-2 text-sm border border-[#86CEEB] bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-xl hover:bg-sky-500 dark:hover:bg-[#2F4852]">Masuk</button>
          </a>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="lg:hidden text-gray-800 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden flex flex-col items-center absolute w-full bg-white dark:bg-[#1D232A] shadow-md transition-all duration-300 ${isMenuOpen ? 'top-[60px] opacity-100' : 'top-[-300px] opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 dark:text-white font-medium">
          <li className="hover:text-gray-900 dark:hover:underline cursor-pointer">
            <a href="#tentang">Tentang Perusahaan</a>
          </li>
          <li className="hover:text-gray-900 dark:hover:underline cursor-pointer">
            <a href="#kegunaan">Kegunaan</a>
          </li>
          <li className="hover:text-gray-900 dark:hover:underline cursor-pointer">
            <a href="#keunggulan">Keunggulan</a>
          </li>
          <li className="hover:text-gray-900 dark:hover:underline cursor-pointer">
            <a href="#carapendaftaran">Cara Pendaftaran</a>
          </li>
        </ul>

        {/* Tombol Join Us & Profile (Mobile) */}
        <div className="flex flex-col items-center space-y-4 pb-6">
          <a href="/login">
            <button className="px-8 py-2 text-sm border border-white bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-xl hover:bg-sky-500">Masuk</button>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
