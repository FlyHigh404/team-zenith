import React, { useEffect, useState } from 'react'
import MateriSertifikasi from '../../components/MateriSertifikasi'
import TabelSertifikasi from '../../components/TabelSertifikasi'
import axios from 'axios'
import { getToken } from '../../utils/token'

const PelamarSertifikasi = () => {
    const [detail, setDetail] = useState(null)
    const [pendaftar, setPendaftar] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/certification-lists/1/applicants`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                })
                setDetail(res.data.data.sertifikasi)
                setPendaftar(res.data.data.pendaftar)
            } catch (err) {
                console.error('❌ Gagal memuat data pelamar:', err)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='bg-[#F5F5F5]'>
            <div className='p-4 sm:ml-64 '>
                <div>
                    <MateriSertifikasi detail={detail} />
                    <TabelSertifikasi pendaftar={pendaftar} />
                </div>
            </div>
        </div>
    )
}

export default PelamarSertifikasi
