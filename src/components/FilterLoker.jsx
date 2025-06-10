import React from 'react'

const FilterLoker = () => {
    return (
        <div className='bg-white p-5 rounded-xl w-75'>
            <div className='flex justify-between px-3'>
                <p className='font-semibold'>Filter <span>(320)</span></p>
                <p className='text-[#ADADAD]'>Hapus Semua</p>
            </div>
            <hr className='my-5 px-3 text-[#D2D2D2] w-60 mx-auto' />
            <div className='my-5 px-3'>
                <p className='my-3 font-semibold'>Durasi</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Jangka pendek (0–3 bulan)
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Jangka tengah (3–12 bulan)
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Jangka panjang (&gt; 1 tahun)
                    </label>
                </div>
            </div>

            <div className='my-5 px-3'>
                <p className='my-3 font-semibold'>Pengalaman</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        &gt; 1 tahun
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        1-3 tahun
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        3-6 tahun
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        &lt; 6 tahun
                    </label>
                </div>
            </div>

            <div className='my-5 px-3'>
                <p className='my-3 font-semibold'>Jenis Industri</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Minyak & Gas
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Pembuatan Kapal
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Kontruksi
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Manufaktur
                    </label>
                    <label className='flex items-center gap-2'>
                        <input type="checkbox" className="checkbox checkbox-primary border-gray-300 " />
                        Otomotif
                    </label>
                </div>
            </div>
        </div>
    )
}

export default FilterLoker
