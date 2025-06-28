import React from 'react'
import { FaHardHat, FaGlobeAsia, FaGraduationCap } from "react-icons/fa";

const Keunggulan = () => {
    const showcaseSteps = [
        {
            icon: <FaHardHat className="text-[#86CEEB] dark:text-[#659BB0] text-2xl" />,
            title: "Menampilkan Diri secara Profesional",
            desc: "Buat kesan pertama yang kuat dengan profil lengkap yang mencerminkan keahlian dan pengalaman Anda.",
        },
        {
            icon: <FaGlobeAsia className="text-[#86CEEB] dark:text-[#659BB0] text-2xl" />,
            title: "Menjangkau Peluang Tanpa Batas",
            desc: "Temukan dan lamar pekerjaan dari berbagai perusahaan welder dengan satu klik.",
        },
        {
            icon: <FaGraduationCap className="text-[#86CEEB] dark:text-[#659BB0] text-2xl" />,
            title: "Meningkatkan Skill dan Kredibilitas",
            desc: "Ikuti program pelatihan dan sertifikasi untuk mengembangkan diri dan meningkatkan daya saing.",
        },
    ];

    return (
        <section id='keunggulan'>
            <div className='lg:mx-14 md:mx-10 mx-5 border-2 border-sky-400 dark:border-[#659BB0] border-dashed p-4 rounded-xl mt-10 lg:mt-0 text-justify'>
                <p className='text-sky-700 dark:text-sky-500 text-base lg:text-lg font-bold mt-3 lg:mt-5 text-center'>KEUNGGULAN WEBSITE</p>
                <h1 className='font-medium text-lg lg:text-2xl my-1 text-center'>Fitur Unggulan yang Mempermudah Segala nya</h1>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-4 my-10 lg:mt-10">
                    {showcaseSteps.map((step, index) => (
                        <div
                            key={index}
                            className="relative max-w-sm p-6 bg-white dark:bg-[#1D232A] border-2 border-gray-300 dark:border-[#2F4852] rounded-xl hover:border-[#86CEEB] dark:hover:border-[#659BB0] pt-14 text-center"
                        >
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#E6F4FA] dark:bg-[#2F4852] p-4 rounded-md shadow-md">
                                {step.icon}
                            </div>
                            <h5 className="mb-2 text-xl md:text-lg font-medium tracking-tight">{step.title}</h5>
                            <p className="text-sm font-reguler text-[#424242] dark:text-slate-300 mt-5">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Keunggulan
