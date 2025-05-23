import React from 'react'
import { FaFolderOpen, FaCheck, FaXmark } from "react-icons/fa6";

const DataPekerjaan = () => {
    return (
        <div className='grid grid-cols-3 mx-5 gap-4'>
            <div className='bg-white p-6 rounded-xl flex'>
                <div className='p-5 bg-[#DCFAF8] rounded-full'>
                    <FaFolderOpen className='text-[#16DBCC] text-2xl' />
                </div>
                <div className='ml-5'>
                    <p className='text-base text-[#718EBF] font-medium'>Semua</p>
                    <h1 className='text-3xl font-semibold text-center'> 0</h1>
                </div>
            </div>
            <div className='bg-white p-6 rounded-xl flex'>
                <div className='p-5 bg-[#E7EDFF] rounded-full'>
                    <FaCheck className='text-[#396AFF] text-2xl' />
                </div>
                <div className='ml-5'>
                    <p className='text-base text-[#718EBF] font-medium'>Sedang Aktif</p>
                    <h1 className='text-3xl font-semibold text-center'> 0</h1>
                </div>
            </div>
            <div className='bg-white p-6 rounded-xl flex'>
                <div className='p-5 bg-[#FFE0EB] rounded-full'>
                    <FaXmark className='text-[#FF82AC] text-2xl' />
                </div>
                <div className='ml-5'>
                    <p className='text-base text-[#718EBF] font-medium'>Sudah Berakhir</p>
                    <h1 className='text-3xl font-semibold text-center'> 0</h1>
                </div>
            </div>
        </div>
    )
}

export default DataPekerjaan
