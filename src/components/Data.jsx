import { useEffect, useState } from 'react'
import { allUserList } from '../api/dashboard'
const Data = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allUserList()
        setUsers(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-4 mx-5 gap-4">
      <div className="bg-[#DDDFFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Total Pekerjaan</p>
        <h1 className="flex text-3xl font-semibold">Belom</h1>
      </div>
      <div className="bg-[#D9EBFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Total Sertifikasi</p>
        <h1 className="flex text-3xl font-semibold">Belom</h1>
      </div>
      <div className="bg-[#DDDFFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Total Pengguna</p>
        <h1 className="flex text-3xl font-semibold">{users.total ? users.total : '-'}</h1>
      </div>
      <div className="bg-[#D9EBFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Pengguna Aktif</p>
        <h1 className="flex text-3xl font-semibold">Belom</h1>
      </div>
    </div>
  )
}

export default Data
