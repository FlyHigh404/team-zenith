import { useState } from 'react'
import { FaExternalLinkAlt, FaMoon, FaBell, FaSearch, FaUserCircle, FaAngleDown, FaAngleUp, FaUser, FaChartPie, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { getUserData } from '../../utils/token'
import badgeAdmin from '../../assets/img/badgeAdmin.png'

const Navbar = ({ title }) => {
  const { logoutUser } = useAuth()
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

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white sticky top-0 z-30 shadow-sm ml-64">
      {/* Judul */}
      <h1 className="text-2xl font-semibold text-[#343C6A]">{title}</h1>

      {/* Tools */}
      <div className="flex items-center gap-4 relative">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8BA3CB]" />
          <input type="text" placeholder="Mencari sesuatu" className="pl-10 pr-4 py-3 rounded-xl text-sm text-[#8BA3CB] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F5F5F5]" />
        </div>

        {/* Ikon */}
        <div className="flex gap-4">
          <div className="p-3 bg-[#F5F5F5] rounded-xl">
            <a href="/beranda-admin">
              <FaExternalLinkAlt className="text-[#575757] hover:text-blue-500 cursor-pointer text-lg" />
            </a>
          </div>
          <div className="p-3 bg-[#F5F5F5] rounded-xl">
            <FaMoon className="text-[#575757] hover:text-blue-500 cursor-pointer text-lg" />
          </div>
          <div className="p-3 bg-[#F5F5F5] rounded-xl">
            <FaBell className="text-[#575757] hover:text-blue-500 cursor-pointer text-lg" />
          </div>
        </div>

        {/* Profil + Dropdown */}
        <div className="relative">
          <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer select-none">
            <div>{userData.fotoProfil ? <img src={`http://34.132.16.206/storage/profiles/${userData.fotoProfil}`} alt="" className="w-12 h-12 rounded-full" /> : <FaUserCircle className="text-4xl text-blue-600" />}</div>
            <span className="text-base font-semibold text-black">{userData.nama}</span>
            {dropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border-gray-500">
              <div className="p-4 border-b-2 border-gray-300 flex">
                <div>{userData.fotoProfil ? <img src={`http://34.132.16.206/storage/profiles/${userData.fotoProfil}`} alt="" className="w-12 h-12 rounded-full" /> : <FaUserCircle className="text-4xl text-blue-600" />}</div>
                <div className="ml-3">
                  <div className="text-black flex items-center gap-1 font-semibold">
                    <span>{userData.nama}</span> <span>{userData.role === 'admin' && <img src={badgeAdmin} alt="Badge Admin" />}</span>
                  </div>
                  <div className="text-sm text-black font-light">{userData.email}</div>
                </div>
              </div>
              <ul className="p-2">
                <NavLink to="/profil-admin" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                  <FaUser />
                  <span>Profil</span>
                </NavLink>
                <NavLink to="/beranda-admin" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                  <FaHome />
                  <span>Beranda</span>
                </NavLink>

                <NavLink to="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 text-black">
                  <FaCog />
                  <span>Pengaturan</span>
                </NavLink>
              </ul>
              <div className="border-t-2 border-gray-300 px-5 py-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer rounded-b-xl" onClick={handleLogout} tabIndex={0} role="button">
                <FaSignOutAlt />
                <span className="ml-2">Keluar</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
