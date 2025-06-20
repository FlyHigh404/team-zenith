import { useEffect, useState } from 'react'
import { allUserList, allCompanyList } from '../api/dashboard'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

const BarChart = () => {
  const [users, setUsers] = useState([])
  const [companys, setCompanys] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await allUserList(currentPage)
        const company = await allCompanyList()
        console.log(company)
        setCompanys(company.data)
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
    <div className="mt-5 mx-5 gap-4">
      <div className="bg-white p-5 rounded-xl">
        <p className="font-semibold">List Pengguna</p>
        <div className="relative">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Asal</th>
                  <th>Keahlian</th>
                  <th>Level</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id} className="text-center">
                    <th>{(currentPage - 1) * 20 + i + 1}</th>
                    <td>{user.nama}</td>
                    <td>
                      {user.kota}, {user.provinsi}
                    </td>
                    <td className="capitalize">{user.keahlian?.join(', ')}</td>
                    <td className="uppercase">{user.levelProfesional?.join(', ')}</td>
                    <td>{user.createdAt.toString().slice(0, 10)}</td>
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
      <div className="pt-5">
        <div className=" bg-white p-5 rounded-xl">
          <p className="font-semibold">Mitra Unedo</p>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kota</th>
                  <th>Email</th>
                  <th>No Telepon</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                {companys.map((company) => (
                  <tr key={company.id} className="text-center">
                    <th>{companys.indexOf(company) + 1}</th>
                    <td>{company.nama}</td>
                    <td>
                      {company.kota}, {company.provinsi}
                    </td>
                    <td>{company.email}</td>
                    <td>{company.notelp}</td>
                    <td>{company.alamat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarChart
