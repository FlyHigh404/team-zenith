import React from 'react'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const Data = () => {
    return (
        <div className='grid grid-cols-4 mx-5 gap-4'>
            <div className='bg-[#DDDFFF] py-4 px-6 rounded-xl space-y-3'>
                <p className='text-base font-medium'>Total Pekerjaan</p>
                <h1 className='flex text-3xl font-semibold'>7,265 <span className='text-xs pl-14 pt-1.5'>+11.01%</span><FaArrowTrendUp className='ml-1 text-xs mt-2' /></h1>
            </div>
            <div className='bg-[#D9EBFF] py-4 px-6 rounded-xl space-y-3'>
                <p className='text-base font-medium'>Total Sertifikasi</p>
                <h1 className='flex text-3xl font-semibold'>3,671 <span className='text-xs pl-14 pt-1.5'>-0.03%</span><FaArrowTrendDown className='ml-1 text-xs mt-2' /></h1>
            </div>
            <div className='bg-[#DDDFFF] py-4 px-6 rounded-xl space-y-3'>
                <p className='text-base font-medium'>Total Pengguna</p>
                <h1 className='flex text-3xl font-semibold'>2,318 <span className='text-xs pl-14 pt-1.5'>+15.03%</span><FaArrowTrendUp className='ml-1 text-xs mt-2' /></h1>
            </div>
            <div className='bg-[#D9EBFF] py-4 px-6 rounded-xl space-y-3'>
                <p className='text-base font-medium'>Pengguna Aktif</p>
                <h1 className='flex text-3xl font-semibold'>156 <span className='text-xs pl-14 pt-1.5'>+6.08%</span><FaArrowTrendUp className='ml-1 text-xs mt-2' /></h1>
            </div>
        </div>
    )
}

export default Data
