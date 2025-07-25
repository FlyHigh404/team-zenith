import { NavLink } from 'react-router-dom'
import { FaBagShopping, FaCertificate, FaBookmark, FaBookOpen } from 'react-icons/fa6'
import badgeAdmin from '../assets/img/badgeAdmin.png'
import { getUserData } from '../utils/token'
import { FaUserCircle } from 'react-icons/fa'

const SidebarProfil = () => {
  const userData = getUserData()

  if (!userData) {
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col border-gray-300 w-full border rounded-2xl bg-white p-4 gap-4 font-sans">
      <div className="flex flex-row gap-3 items-center">
        {userData.fotoProfil ? (
          <img src={`http://34.132.16.206/storage/profiles/${userData.fotoProfil}`} alt="Foto Profil" className="w-12 h-12 rounded-full shrink-0 object-cover" />
        ) : (
          <div>{userData.fotoProfil ? <img src={userData.fotoProfil} alt="" className="w-12 h-12 rounded-full" /> : <FaUserCircle className="text-4xl text-blue-600" />}</div>
        )}
        <NavLink to="/profil-admin" className="flex flex-col">
          <div className="flex flex-row gap-1 items-center">
            <p className="font-semibold text-base">{userData.nama}</p>
            {userData.role === 'admin' && <img src={badgeAdmin} alt="Badge Admin" />}
          </div>
          <p className="text-xs">@{userData.username}</p>
        </NavLink>
      </div>

      <ul className="space-y-1">
        <li>
          <NavLink to="/list-sertifikasi" className="flex items-center p-2 rounded-lg group font-medium hover:bg-gray-100">
            <FaCertificate className="text-xl" />
            <span className="ml-3 text-sm">Sertifikasi</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/list-loker" className="flex items-center p-2 rounded-lg group font-medium hover:bg-gray-100">
            <FaBagShopping className="text-xl" />
            <span className="ml-3 text-sm">Pekerjaan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/simpan-postingan" className="flex items-center p-2 rounded-lg group font-medium hover:bg-gray-100">
            <FaBookmark className="text-xl" />
            <span className="ml-3 text-sm">Tersimpan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/lamaran" className="flex items-center p-2 rounded-lg group font-medium hover:bg-gray-100">
            <FaBookOpen className="text-xl" />
            <span className="ml-3 text-sm">Lamaran Saya</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SidebarProfil
