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
    <div className="flex gap-10 px-10 py-8 bg-[#F5F5F5] min-h-screen">
      <LokerInfo job={job} />
      <LokerForm job={job} user={user} />
    </div>
  )
}

export default LokerApply
