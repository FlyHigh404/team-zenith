import { useEffect, useState } from 'react'
import ChartTotalPekerjaan from './JobChart'
import { allJobs } from '../api/dashboard'
import { getUserData, getLastLogin } from '../utils/token'

const Chart = () => {
  const userData = getUserData()
  const lastLogin = getLastLogin()
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    allJobs().then((res) => {
      const pekerjaan = res.data
      const pekerjaanPerPerusahaan = pekerjaan.reduce((acc, curr) => {
        const namaPerusahaan = curr.perusahaan.nama
        acc[namaPerusahaan] = (acc[namaPerusahaan] || 0) + 1
        return acc
      }, {})
      const formatted = Object.entries(pekerjaanPerPerusahaan)
        .map(([nama, total]) => ({
          perusahaan: nama,
          total,
        }))
        .sort((a, b) => b.total - a.total)
      setChartData(formatted)
      setLoading(false)
    })
  }, [])

  return (
    <div className="mt-5 mx-5 flex gap-4">
      <div className="w-[70%] bg-white p-5 rounded-xl ">
        <p className="font-semibold">Total Pekerjaan</p>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-lg font-semibold">Loading...</span>
          </div>
        ) : (
          <ChartTotalPekerjaan data={chartData} />
        )}
      </div>
      <div className="w-[30%] bg-white p-5 rounded-xl ">
        <p className="font-semibold mb-3">Riwayat Aktivitas</p>
        <div>
          <p>Created At:</p>
          <p className="pb-3">{userData.createdAt.toString().slice(0, 10)}</p>
          <p>Last Login:</p>
          <p>{lastLogin.toString().slice(0, 10) + ' - ' + lastLogin.toString().slice(11, 19)}</p>
        </div>
      </div>
    </div>
  )
}

export default Chart
