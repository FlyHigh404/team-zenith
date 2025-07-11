import { useState, useEffect } from 'react'
import { FaMoon, FaBell, FaSearch, FaUserCircle, FaAngleDown, FaAngleUp, FaUser, FaChartPie, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa'
import { FaBagShopping, FaCertificate, FaBookmark } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { getUserData } from '../../utils/token'
import badgeAdmin from '../../assets/img/badgeAdmin.png'
import ModalNotifikasi from './ModalNotifikasi'

function Navbar() {
  const { logoutUser } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logoutUser()
    }
  }

  const userData = getUserData()
  const [showModal, setShowModal] = useState(false)

  return (
    <nav
      className={`top-0 left-0 w-full z-50 transition-all duration-300 
  ${isScrolled ? 'lg:bg-white lg:shadow-md bg-white dark:bg-[#1D232A]/50' : 'bg-white dark:bg-[#1D232A]'} font-sans sticky z-30 `}
    >
      <div className="flex justify-between items-center px-6 md:px-20 py-2 shadow-sm max-w-full mx-auto">
        <div className="flex items-center gap-4 relative">
          <a href="/beranda-admin" className="text-2xl font-bold text-[#86CEEB]">
            UNEDO
          </a>

          {/* Search */}
          <div className="relative">
            <input type="text" placeholder="Cari" className="pr-12 pl-4 py-1.5 rounded-xl text-base font-medium text-[#434343] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F5F5F5]" />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          </div>
        </div>

        {/* Menu untuk Desktop */}
        {/* <ul className="hidden lg:flex space-x-12 text-gray-700 font-medium">
          <li className="hover:text-gray-900 cursor-pointer text-base">
            <a href="/beranda-admin">Beranda</a>
          </li>
          <li className="hover:text-gray-900 cursor-pointer text-base">
            <a href="#pesan">Pesan</a>
          </li>
        </ul> */}

        <div className="flex items-center gap-3 relative">
          {/* Ikon */}
          <div className="flex gap-4">
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl hidden md:block">
              <a href="/beranda-admin">
                <FaHome className="text-[#575757] hover:text-blue-500 cursor-pointer text-md" />
              </a>
            </div>
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl hidden md:block">
              <FaMoon className="text-[#575757] hover:text-blue-500 cursor-pointer text-md" />
            </div>
            <div className="p-2.5 bg-[#F5F5F5] rounded-xl hidden md:block">
              <FaBell onClick={() => setShowModal(!showModal)} className="text-[#575757] hover:text-blue-500 cursor-pointer text-md" />
            </div>
            {showModal && (
              <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-lg p-4 w-[350px]">
                <ModalNotifikasi />
              </div>
            )}
          </div>

          {/* Profil + Dropdown */}
          <div className="relative">
            <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer select-none">
              <FaUserCircle className="text-blue-600 text-3xl" />
              <span className="text-base font-semibold text-black hidden md:block">{userData.nama}</span>
              {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border-gray-500">
                <div className="p-4 border-b-2 border-gray-300 flex">
                  <div>
                    <FaUserCircle className="text-4xl text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <div className="text-black flex items-center gap-1 font-semibold">
                      <span>{userData.nama}</span> <span>{userData.role === 'admin' && <img src={badgeAdmin} alt="Badge Admin" />}</span>
                    </div>
                    <div className="text-sm text-black font-light">@{userData.username}</div>
                  </div>
                </div>
                <ul className="p-2">
                  <NavLink to="/profil-admin" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                    <FaUser />
                    <span>Profil</span>
                  </NavLink>
                  {userData.role === 'admin' && (
                    <NavLink to="/dashboard-admin" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                      <FaChartPie />
                      <span>Dashboard</span>
                    </NavLink>
                  )}
                  <NavLink to="/list-loker" className="md:hidden flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                    <FaBagShopping />
                    <span>Pekerjaan</span>
                  </NavLink>
                  <NavLink to="/list-sertifikasi" className="md:hidden flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                    <FaCertificate />
                    <span>Sertifikasi</span>
                  </NavLink>
                  <NavLink to="/simpan-postingan" className="md:hidden flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                    <FaBookmark />
                    <span>Tersimpan</span>
                  </NavLink>
                  <NavLink to="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                    <FaCog />
                    <span>Pengaturan</span>
                  </NavLink>
                </ul>
                <a href="#" className="md:hidden border-t-2 border-gray-300 px-5 py-2.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-b-xl" tabIndex={0}>
                  <FaMoon />
                  <span className="ml-2">Mode</span>
                </a>
                <a href="#" className="md:hidden px-5 py-2.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-xl" tabIndex={0}>
                  <FaBell />
                  <span className="ml-2">Notification</span>
                </a>
                <div className="border-t-2 border-gray-300 px-5 py-2.5 flex items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-b-xl" onClick={handleLogout} tabIndex={0} role="button">
                  <FaSignOutAlt />
                  <span className="ml-2">Keluar</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
