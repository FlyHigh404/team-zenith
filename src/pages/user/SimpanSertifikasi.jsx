import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import Tersimpan from '../../components/Tersimpan';
import Sertifikasi from '../../components/SertifikasiSimpan';

const SimpanSertifikasi = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-[#F5F5F5]'>
            <div className='bg-white w-full p-4'>
                <button
                    onClick={() => navigate(-1)}
                    className="text-black text-base font-medium flex items-center"
                >
                    <FaArrowLeft className="mr-2" /> Disimpan
                </button>
            </div>
            <div className='flex my-5 '>
                <div className='w-[30%]'><Tersimpan /></div>
                <div className='w-[70%]'><Sertifikasi /> </div>
            </div>
        </div>
    )
}

export default SimpanSertifikasi
