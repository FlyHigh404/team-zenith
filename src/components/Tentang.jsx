import React from 'react'
import img from '../assets/img/tentang.png'

const Tentang = () => {
    return (
        <section id='tentang'>
            <div className='w-full bg-[#86CEEB] dark:bg-[#2F4852] md:grid md:grid-cols-2 md:gap-6 lg:py-16 md:py-8 py-8 lg:px-20 md:px-10 px-5'>
                <div className="h-full">
                    <img src={img} className="w-120" />
                </div>
                <div>
                    <p className='text-sky-700 dark:text-sky-500 text-base lg:text-lg font-bold mt-10 md:mt-0'>TENTANG PERUSAHAAN</p>
                    <h1 className='dark:text-white font-semibold text-lg lg:text-2xl my-3 leading-normal'>Kenali UNEDO Lebih Dekat Sebelum Menjelajahi Layanan Kami</h1>
                    <p className='dark:text-slate-300 font-reguler lg:text-base md:text-xs text-sm text-justify'>UNEDO adalah platform digital yang dirancang khusus untuk dunia pengelasan. Kami mempertemukan welder profesional dengan perusahaan, menyediakan ruang untuk membangun profil, mencari pekerjaan, mengikuti pelatihan, serta menjalin koneksi industri secara lebih mudah dan efisien.</p>
                </div>
            </div>
        </section>
    )
}

export default Tentang
