import React, { useState, useEffect } from 'react'
import { FaRegUser } from 'react-icons/fa'
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'lg:bg-white/50 lg:backdrop-blur-md lg:shadow-md bg-white' : 'bg-white'}`}>
      <div className="max-w-full mx-auto px-6 md:px-24 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-[#1201C9]">
          UNEDO
        </a>

        {/* Menu untuk Desktop */}
        <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-gray-900 cursor-pointer">
            <a href="#">Home</a>
          </li>
          <li className="hover:text-gray-900 cursor-pointer">
            <a href="#about">About Us</a>
          </li>
          <li className="hover:text-gray-900 cursor-pointer">Jobs</li>
          <li className="hover:text-gray-900 cursor-pointer">Workshop</li>
          <li className="hover:text-gray-900 cursor-pointer">Testimonials</li>
          <li className="hover:text-gray-900 cursor-pointer">Contact</li>
        </ul>

        {/* Tombol Join Us & Profile (Desktop) */}
        <div className="hidden lg:flex space-x-4">
          <a href="/register">
            <button className="px-4 py-2 border border-white bg-[#1201C9] text-white rounded-3xl hover:bg-blue-700">Join Us</button>
          </a>
          <a href="#" className="px-3 py-2 bg-[#1201C9] text-white rounded-full hover:bg-blue-700">
            <FaRegUser size={24} color="white" />
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
          <li className="hover:text-gray-900 cursor-pointer">Home</li>
          <li className="hover:text-gray-900 cursor-pointer">About Us</li>
          <li className="hover:text-gray-900 cursor-pointer">Jobs</li>
          <li className="hover:text-gray-900 cursor-pointer">Workshop</li>
          <li className="hover:text-gray-900 cursor-pointer">Testimonials</li>
          <li className="hover:text-gray-900 cursor-pointer">Contact</li>
        </ul>

        {/* Tombol Join Us & Profile (Mobile) */}
        <div className="flex flex-col items-center space-y-4 pb-6">
          <a href="/register">
            <button className="px-6 py-2 border border-white bg-[#1201C9] text-white rounded-2xl hover:bg-blue-700">Join Us</button>

            {/* Nanti kalo udah Join Us, tombolnya jadi profile */}

            {/* <a href="#" className="p-3 bg-[#1201C9] text-white rounded-full hover:bg-blue-700">
            <FaRegUser size={24} color="white" />
          </a> */}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
