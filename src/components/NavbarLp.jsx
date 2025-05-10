import React, { useState, useEffect } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { FiMenu, FiX } from 'react-icons/fi'

function NavbarLp() {
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
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'lg:bg-white/50 lg:backdrop-blur-md lg:shadow-md bg-white' : 'bg-white'}`}>
            <div className="max-w-full mx-auto px-6 md:px-24 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-[#86CEEB]">
                    UNEDO
                </a>

                {/* Menu untuk Desktop */}
                <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
                    <li className="hover:text-gray-900 cursor-pointer text-sm">Tentang Perusahaan</li>
                    <li className="hover:text-gray-900 cursor-pointer text-sm">Kegunaan</li>
                    <li className="hover:text-gray-900 cursor-pointer text-sm">Keunggulan</li>
                    <li className="hover:text-gray-900 cursor-pointer text-sm">Cara Pendaftaran</li>
                </ul>

                {/* Tombol Join Us & Profile (Desktop) */}
                <div className="hidden lg:flex space-x-4">
                    <a href="/login">
                        <button className="px-8 py-2 text-sm border border-white bg-[#86CEEB] text-white rounded-xl hover:bg-sky-500">Masuk</button>
                    </a>
                </div>

                {/* Hamburger Menu Button (Mobile) */}
                <button className="lg:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden flex flex-col items-center absolute w-full bg-white shadow-md transition-all duration-300 ${isMenuOpen ? 'top-[60px] opacity-100' : 'top-[-300px] opacity-0 pointer-events-none'}`}>
                <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
                    <li className="hover:text-gray-900 cursor-pointer">Tentang Perusahaan</li>
                    <li className="hover:text-gray-900 cursor-pointer">Kegunaan</li>
                    <li className="hover:text-gray-900 cursor-pointer">Keunggulan</li>
                    <li className="hover:text-gray-900 cursor-pointer">Cara Pendaftaran</li>
                </ul>

                {/* Tombol Join Us & Profile (Mobile) */}
                <div className="flex flex-col items-center space-y-4 pb-6">
                    <a href="/login">
                        <button className="px-8 py-2 text-sm border border-white bg-[#86CEEB] text-white rounded-xl hover:bg-sky-500">Masuk</button>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default NavbarLp
