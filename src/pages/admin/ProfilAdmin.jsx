import React from 'react'
import InformasiProfil from '../../components/InformasiProfil'
import InformasiKontak from '../../components/InformasiKontak'
import PekerjaanTerbaru from '../../components/PekerjaanTerbaru'
import RekomendasiKoneksi from '../../components/RekomendasiKoneksi'
import PostinganAdmin from '../../components/PostinganAdmin'

const ProfilAdmin = () => {
    return (
        <div className='bg-[#F5F5F5] flex md:flex-col lg:flex-row gap-x-5'>
            <div className="flex-grow w-full lg:w-[67%] flex flex-col justify-start md:pl-20 gap-4 mt-4">
                <InformasiProfil />
                <PostinganAdmin />
            </div>
            <div className="flex-grow w-full lg:w-[33%] flex flex-col justify-start md:pr-20 gap-4 mt-4">
                <InformasiKontak />
                <PekerjaanTerbaru />
                <RekomendasiKoneksi />
            </div>
        </div>
            
        
    )
}

export default ProfilAdmin