import React, { useEffect, useState } from 'react'
import MateriPekerjaan from '../../components/MateriPekerjaan'
import TabelPekerjaan from '../../components/TabelPekerjaan'
import axios from 'axios'
import { getToken } from '../../utils/token'
import { useParams } from 'react-router-dom'

const PelamarPekerjaan = () => {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/job-listings/${id}`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                })
                setDetail(res.data.data)
            } catch (err) {
                console.error('❌ Gagal memuat detail sertifikasi:', err)
            }
        }

        fetchDetail()
    }, [id])

    return (
        <div className='bg-[#F5F5F5]'>
            <div className='p-4 sm:ml-64 '>
                <div>
                    <MateriPekerjaan detail={detail} />
                    <TabelPekerjaan pekerjaanId={id} />
                </div>
            </div>
        </div>
    )
}

export default PelamarPekerjaan
