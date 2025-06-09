import React from 'react'

const FilterSertifikasi = () => {
    return (
        <div className='bg-white p-5 rounded-xl w-75'>
            <div className='flex justify-between px-3'>
                <p className='font-semibold'>Filter <span>(320)</span></p>
                <p className='text-[#ADADAD]'>Hapus Semua</p>
            </div>
            <hr className='my-5 px-3 text-[#D2D2D2] w-60 mx-auto' />
            <div className='my-5 px-3'>
                <p className='my-3 font-semibold'>Jenis Sertifikasi</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Ujian Kompetensi BNSP
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Ujian Kompetensi EBTKE
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Migas
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        ABS
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Kem. Ketenagakerjaan RI
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Disnaker
                    </label>
                </div>
            </div>

            <div className='my-5 px-3'>
                <p className='my-3 font-semibold'>Bidang</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Welder
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Inspector
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Painter
                    </label>
                </div>
            </div>

            <div className='my-5 px-3'>
                <p className='my-3 font-semibold'>Lokasi</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Online
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        On-site
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FilterSertifikasi
