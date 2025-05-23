import React from 'react'
import MateriPekerjaan from '../../components/MateriPekerjaan'
import TabelPekerjaan from '../../components/TabelPekerjaan'

const PelamarPekerjaan = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <div className='p-4 sm:ml-64 '>
                <div>
                    <MateriPekerjaan />
                    <TabelPekerjaan />
                </div>
            </div>
        </div>
    )
}

export default PelamarPekerjaan
