import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchLokerById } from '../../api/forum'
import LokerInfo from '../../components/LokerInfo'
import LokerForm from '../../components/LokerForm'
import { getUserData } from '../../utils/token'

const LokerApply = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUserData()

  useEffect(() => {
    fetchLokerById(id)
      .then((data) => setJob(data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Memuat data loker...</p>
  if (!job) return <p>Loker tidak ditemukan.</p>

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10 py-8 bg-[#F5F5F5] min-h-screen">
      <div className="md:w-1/3 w-full">
        <LokerInfo job={job} />
      </div>
      <div className="md:w-2/3 w-full">
        <LokerForm job={job} user={user} />
      </div>
    </div>

  )
}

export default LokerApply
