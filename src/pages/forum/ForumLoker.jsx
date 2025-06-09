import React from 'react'
import Search from '../../components/Search'
import Loker from '../../components/Loker'

const ForumLoker = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <Search tipe="pekerjaan" />
            <Loker />
        </div>
    )
}

export default ForumLoker
