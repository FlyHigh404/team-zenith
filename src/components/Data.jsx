import { useEffect, useState } from 'react'
import { allUserList, allJobList, allCertificateList } from '../api/dashboard'

const Data = () => {
  const [, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [certificates, setCertificates] = useState([])

  const [userTotal, setUserTotal] = useState(0)
  const [userActive, setUserActive] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await allUserList()
        const job = await allJobList()
        const certificate = await allCertificateList()
        setJobs(job.data)
        setCertificates(certificate.data)

        setUsers(user.data?.data || [])
        setUserTotal(user.data?.total || 0)

        const activeCount = user.data?.data?.filter((u) => u.is_active)?.length || 0
        setUserActive(activeCount)
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
        <h1 className="flex text-3xl font-semibold">{jobs.total_loker ? jobs.total_loker : '-'}</h1>
      </div>
      <div className="bg-[#D9EBFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Total Sertifikasi</p>
        <h1 className="flex text-3xl font-semibold">{certificates.total_programs ? certificates.total_programs : '-'}</h1>
      </div>
      <div className="bg-[#DDDFFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Total Pengguna</p>
        <h1 className="flex text-3xl font-semibold">{userTotal ? userTotal : '-'}</h1>
      </div>
      <div className="bg-[#D9EBFF] py-4 px-6 rounded-xl space-y-3">
        <p className="text-base font-medium">Pengguna Aktif</p>
        <h1 className="flex text-3xl font-semibold">{userActive ? userActive : '-'}</h1>
      </div>
    </div>
  )
}

export default Data
