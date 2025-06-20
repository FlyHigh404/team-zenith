import { useState } from 'react'
import { FaRegSquarePlus, FaRegSquareCheck } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const PenggunaAktif = () => {
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: 'Andi Prasetyo',
      desc: 'Welder - Plate | 3G GMAW & GTAW',
      isConnect: false,
    },
    {
      id: 2,
      name: 'Budi Hartono',
      desc: 'Welder - Pipe | 6G SMAW',
      isConnect: false,
    },
  ])

  const toogleConnect = (id) => {
    setUserData((prev) => prev.map((user) => (user.id === id ? { ...user, isConnect: !user.isConnect } : user)))
  }

  return (
    <div className="flex flex-col gap-0 font-sans">
      <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3 gap-4">
        <h2 className="font-semibold text-base">Pengguna Aktif</h2>
      </div>

      <div className="flex flex-col border-gray-300 border border-t-0 rounded-b-xl bg-white px-4 py-3 gap-3">
        {userData.slice(0, 10).map((user) => (
          <div to="#profil-user" className="flex flex-row items-center justify-between gap-4 w-full">
            <NavLink to="#profil-user" key={user.id} className="flex flex-row gap-3 items-start">
              <div className="bg-gray-700 w-8 h-8 rounded-full shrink-0"></div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs line-clamp-2">{user.desc}</p>
              </div>
            </NavLink>
            <button type="button" onClick={() => toogleConnect(user.id)} className="text-lg">
              {user.isConnect ? <FaRegSquareCheck className="text-blue-600" /> : <FaRegSquarePlus />}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PenggunaAktif
