import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBagShopping, FaCertificate, FaNewspaper } from 'react-icons/fa6'

const Tersimpan = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const links = [
    { path: '/simpan-postingan', label: 'Postingan', icon: <FaNewspaper /> },
    { path: '/simpan-pekerjaan', label: 'Pekerjaan', icon: <FaBagShopping /> },
    { path: '/simpan-sertifikasi', label: 'Sertifikasi', icon: <FaCertificate /> },
  ]

  return (
    <div className="w-72 bg-white rounded-xl shadow px-6 py-4 space-y-3 ml-10">
      {links.map((link) => (
        <div>
          <Link key={link.path} to={link.path}>
            <p className={`flex gap-3 items-center py-2 px-4 rounded-lg cursor-pointer ${currentPath === link.path ? 'text-[#86CEEB] font-semibold bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}>
              {link.icon}
              {link.label}
            </p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Tersimpan
