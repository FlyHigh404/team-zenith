import React from 'react'
import img from '../assets/img/sertifikasi.png'

const MateriSertifikasi = ({ detail }) => {
    if (!detail) return null

    return (
        <div className='bg-white mx-5 p-5 rounded-xl flex justify-between'>
            <div className='flex'>
                <img src={img} alt="Sertifikasi" className='w-20 h-20 object-cover rounded-lg' />
                <div className='ml-5'>
                    <p className='text-2xl font-semibold'>{detail.judul}</p>
                    <p className='text-md font-medium'>{detail.bidang}</p>
                </div>
            </div>
            <div className='text-right'>
                <p className='text-gray-400'>
                    {new Date(detail.tanggalMulai).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })} - {new Date(detail.tanggalSelesai).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
            </div>

        </div>
    )
}

export default MateriSertifikasi
