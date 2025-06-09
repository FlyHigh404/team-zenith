import React from 'react'
import Search from '../../components/Search'
import Sertifikasi from '../../components/Sertifikasi'

const ForumSertifikasi = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <Search tipe="sertifikasi" />
            <Sertifikasi />
        </div>
    )
}

export default ForumSertifikasi
