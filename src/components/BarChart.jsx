import { useEffect, useState } from 'react'
import { allUserList } from '../api/dashboard'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

const BarChart = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await allUserList(currentPage)
        setUsers(res.data.data)
        setTotalPage(res.data.last_page)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage])

  return (
    <div className="mt-5 grid grid-cols-2 mx-5 gap-4">
      <div className="bg-white p-5 rounded-xl">
        <p className="font-semibold">List Pengguna</p>
        <div className="relative">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Asal</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id}>
                    <th>{(currentPage - 1) * 20 + i + 1}</th>
                    <td>{user.nama}</td>
                    <td>
                      {user.kota}, {user.provinsi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 flex justify-center items-center z-10">
                <span className="text-lg font-semibold">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-3">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded">
            {currentPage === 1 ? <FaChevronLeft className="opacity-50" /> : <FaChevronLeft />}
          </button>

          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPage))} disabled={currentPage === totalPage} className="px-3 py-1 border rounded">
            {currentPage === totalPage ? <FaChevronRight className="opacity-50" /> : <FaChevronRight />}
          </button>
        </div>
      </div>
      <div className=" bg-white p-5 rounded-xl">
        <p className="font-semibold">Mitra Unedo</p>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Pekerjaan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>01</th>
                <td>PT. Jaya Abadi</td>
                <td>100</td>
              </tr>
              <tr>
                <th>02</th>
                <td>PT. Petro Weldindo</td>
                <td>75</td>
              </tr>
              <tr>
                <th>03</th>
                <td>PT. Karya Baja</td>
                <td>63</td>
              </tr>
              <tr>
                <th>04</th>
                <td>PT. Energi Maritim</td>
                <td>34</td>
              </tr>
              <tr>
                <th>05</th>
                <td>PT. Surya Teknik</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BarChart
