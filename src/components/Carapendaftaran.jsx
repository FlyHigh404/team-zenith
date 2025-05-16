import React from 'react'

const Carapendaftaran = () => {
    const steps = [
        {
            number: 1,
            title: 'Daftar Akun',
            description: 'Buat akun UNEDO secara gratis hanya dengan email aktif dan beberapa informasi dasar.',
        },
        {
            number: 2,
            title: 'Lengkapi Profil',
            description: 'Isi data diri, pengalaman kerja, keahlian, dan sertifikasi agar profilmu tampil profesional.',
        },
        {
            number: 3,
            title: 'Cari & Terhubung',
            description: 'Jelajahi lowongan kerja, ikuti pelatihan, dan bangun koneksi dengan sesama welder maupun perusahaan.',
        },
        {
            number: 4,
            title: 'Komunitas',
            description: 'Ikut berdiskusi di forum, berbagi pengalaman, dan tumbuh bersama komunitas welder se–Indonesia.',
        },
    ];

    return (
        <section id='carapendaftaran'>
            <div className='lg:mx-14 md:mx-10 mx-5 mt-10'>
                <div className="grid md:grid-cols-[40%_60%] gap-6">
                    <div>
                        <p className='text-sky-700 dark:text-sky-500 text-base lg:text-lg font-bold'>CARA PENDAFTARAN</p>
                        <h1 className='font-medium text-xl md:text-lg lg:text-2xl my-1'>Mulai Jadi Bagian Komunitas</h1>
                        <p className='dark:text-slate-300 font-reguler text-sm text-justify'>Gabung ke dalam komunitas welder profesional dan industri hanya dengan beberapa langkah mudah. Daftar sekarang dan bangun koneksi yang relevan untuk masa depan kariermu.</p>
                    </div>
                    <div className='mt-10 md:mt-0 '>
                        <div className="relative">
                            {/* Garis vertikal putus-putus */}
                            <div className="absolute top-5 left-5 w-0.5 h-98 md:h-72 lg:h-62 border-l-2 border-dashed border-gray-500 z-0" />
                            {steps.map((step, index) => (
                                <div className="flex items-start relative pb-8" key={index}>
                                    {/* Nomor bulat biru */}
                                    <div className="flex flex-col items-center z-10 w-10 relative">
                                        <div className="w-10 h-10 bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-full flex items-center justify-center font-medium text-xl">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Konten */}
                                    <div className="ml-4 text-justify">
                                        <h3 className="dark:text-white font-medium text-xl md:text-lg mb-1">{step.title}</h3>
                                        <p className="text-sm text-[#424242] dark:text-slate-300">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carapendaftaran
