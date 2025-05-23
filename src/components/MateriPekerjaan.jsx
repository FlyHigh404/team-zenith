import React from 'react'
import img from '../assets/img/sertifikasi.png'

const MateriTabel = () => {
    return (
        <div className='bg-white mx-5 p-5 rounded-xl flex justify-between'>
            <div className='flex'>
                <img src={img} alt="" />
                <div className='ml-5'>
                    <p className='text-2xl font-semibold'>PT Karya Baja</p>
                    <p className='text-md font-medium'>Welder - SMAW 3G</p>
                </div>
            </div>
            <div>
                <p className='text-gray-400'>Cilegon, Banten</p>
            </div>
        </div>
    )
}

export default MateriTabel
