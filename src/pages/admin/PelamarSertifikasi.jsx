import React from 'react'
import MateriSertifikasi from '../../components/MateriSertifikasi'
import TabelSertifikasi from '../../components/TabelSertifikasi'

const PelamarSertifikasi = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <div className='p-4 sm:ml-64 '>
                <div>
                    <MateriSertifikasi />
                    <TabelSertifikasi />
                </div>
            </div>
        </div>
    )
}

export default PelamarSertifikasi
