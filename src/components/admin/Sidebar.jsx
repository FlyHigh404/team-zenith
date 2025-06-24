import { NavLink } from 'react-router-dom'
import { FaHouse, FaBagShopping, FaCertificate, FaBuilding } from 'react-icons/fa6'
// import logo from '../../assets/img/logo.png'

const Sidebar = () => {
  const navItemClass = ({ isActive }) => `flex items-center p-2 rounded-lg group text-lg font-medium ${isActive ? 'border-l-4 border-[#86CEEB] text-[#86CEEB]' : 'text-gray-600 hover:bg-gray-100'}`

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg shadow-r-xl shadow-gray-400">
      <div className="h-full px-4 py-5 overflow-y-auto">
        {/* Logo */}
        <a href="/beranda-admin" className="flex items-center gap-2 mb-8">
          {/* <img src={logo} alt="Logo" className="h-8" /> */}
          <span className="text-xl font-bold text-[#86CEEB]">UNEDO</span>
        </a>

        {/* Menu */}
        <ul className="space-y-4">
          <li>
            <NavLink to="dashboard-admin" className={navItemClass}>
              <FaHouse className="text-xl" />
              <span className="ml-3 text-lg">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="pekerjaan-admin" className={navItemClass}>
              <FaBagShopping className="text-xl" />
              <span className="ml-3 text-lg">Pekerjaan</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="sertifikasi-admin" className={navItemClass}>
              <FaCertificate className="text-xl" />
              <span className="ml-3 text-lg">Sertifikasi</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="mitra-admin" className={navItemClass}>
              <FaBuilding className="text-xl" />
              <span className="ml-3 text-lg">Mitra Perusahaan</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
