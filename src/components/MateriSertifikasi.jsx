import React from 'react'
import img from '../assets/img/sertifikasi.png'

const MateriSertifikasi = () => {
    return (
        <div className='bg-white mx-5 p-5 rounded-xl flex justify-between'>
            <div className='flex'>
                <img src={img} alt="" />
                <div className='ml-5'>
                    <p className='text-2xl font-semibold'>Sertifikasi SMAW 3G Plate</p>
                    <p className='text-md font-medium'>Welder - Plate</p>
                </div>
            </div>
            <div>
                <p className='text-gray-400'>12 Januari 2025</p>
            </div>
        </div>
    )
}

export default MateriSertifikasi
