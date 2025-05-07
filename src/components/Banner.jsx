import React from 'react'
import img from '../assets/img/landingpage.png'

const Banner = () => {
    return (
        <section id="banner">
            <div className='lg:mx-14 md:mx-14 mx-5'>
                <div className='grid gap-4 md:grid-cols-2 text-justify'>
                    <div className='md:mt-24 mt-20'>
                        <h1 className='font-semibold text-2xl md:text-xl lg:text-[40px] text-[#254336] leading-normal'>Bangun Karier <span className='text-[#86CEEB] inline-block'>Profesional</span> di Dunia <span className='text-[#86CEEB] inline-block'>Pengelasan</span></h1>
                        <p className='text-black lg:text-lg md:text-base font-regular mt-5 leading-relaxed'>Temukan peluang kerja, kembangkan skill, dan bangun koneksi industri hanya di UNEDO – platform khusus untuk welder dan perusahaan.</p>
                        <a href="/register">
                            <button type="button"
                                className="text-white bg-[#86CEEB] hover:bg-[#659BB0] font-medium rounded-lg lg:text-sm px-4 lg:px-8 py-2 lg:py-4 text-center mt-6 mb-3 lg:mt-10">Gabung Sekarang</button>
                        </a>
                    </div>
                    <div className="flex justify-end items-end lg:mr-10 md:mt-16">
                        <img src={img} className="lg:w-[80%] lg:h-auto hidden md:block lg:block" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
