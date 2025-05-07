import React from 'react'
import { FaUserTie, FaBriefcase, FaEnvelopeOpenText, FaUsers, FaFileAlt, FaHistory } from "react-icons/fa";

const Kegunaan = () => {
    const fiturSteps = [
        {
            icon: <FaUserTie />,
            title: "Membuat Profil Profesional",
            desc: "Tampilkan Keahlian, Pengalaman Kerja, dan Sertifikasi Anda dalam satu profil yang mudah diakses.",
        },
        {
            icon: <FaBriefcase />,
            title: "Menemukan Lowongan Kerja",
            desc: "Jelajahi peluang kerja khusus di bidang pengelasan dan industri terkait.",
        },
        {
            icon: <FaEnvelopeOpenText />,
            title: "Melamar Pekerjaan Secara Langsung",
            desc: "Lamar lowongan kerja dengan mudah melalui sistem yang sudah terintegrasi.",
        },
        {
            icon: <FaUsers />,
            title: "Terhubung dengan Perusahaan dan Mitra",
            desc: "Bangun jaringan profesional dengan stakeholder industri yang relevan.",
        },
        {
            icon: <FaFileAlt />,
            title: "Mengikuti Pelatihan dan Sertifikasi",
            desc: "Tingkatkan Kompetensi lewat program pelatihan yang disediakan mitra resmi.",
        },
        {
            icon: <FaHistory />,
            title: "Menyimpan Riwayat & Feedback Pekerjaan",
            desc: "Rekam jejak kerja dan penilaian dari perusahaan tercatat otomatis di profil Anda.",
        },
    ];

    return (
        <section id='kegunaan'>
            <div className='lg:mx-14 mx-5 md:mx-10'>
                <p className='text-sky-700 text-base lg:text-lg font-bold mt-10'>KEGUNAAN WEBSITE</p>
                <h1 className='font-medium text-lg lg:text-2xl my-1'>Meningkatkan Karir Profesional Anda </h1>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-5'>
                    {fiturSteps.map((step, index) => (
                        <div
                            key={index}
                            className="max-w-sm p-6 bg-white border-2 border-gray-300 rounded-xl hover:border-[#86CEEB]"
                        >
                            <div>
                                <div className="bg-[#86CEEB] border-2 border-sky-500 p-4 rounded-md text-white text-4xl md:text-2xl inline-block mb-4">
                                    {step.icon}
                                </div>
                                <h5 className="mb-2 text-xl md:text-lg font-medium tracking-tight">{step.title}</h5>
                                <p className="text-sm font-reguler text-[#424242]">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Kegunaan
