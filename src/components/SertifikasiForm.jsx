import React from 'react'

const SertifikasiForm = () => {
    return (
        <div className="w-2/3 bg-white p-4 rounded-lg mt-10 shadow-md">
            <h1 className="text-xl font-bold mb-4">Daftar Sertifikasi</h1>
            <form className="mt-5 md:mt-10 lg:mt-5">
                <div className="flex gap-4">
                    <div className="mb-4 md:mb-7 lg:mb-4 w-full">
                        <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Nama Lengkap</label>
                        <input type="text" name="nama" placeholder="Masukkan nama Anda" className="dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mb-4 md:mb-7 lg:mb-4 w-full">
                        <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Nomor Telepon</label>
                        <input type="number" name="nomor" placeholder="Masukkan nomor Anda" className="dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mb-4 md:mb-7 lg:mb-4 w-full">
                        <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Email</label>
                        <input type="text" name="birthDate" placeholder="Masukkan email Anda" className="dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                </div>

                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Alamat</label>
                    <textarea type="text" name="addres" placeholder="Masukkan alamat Anda" className="textarea dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="flex gap-4">
                    <div className="w-[50%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Kota</label>
                            <input type="text" name="kota" placeholder="Masukkan nomor Anda" className="dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Provinsi</label>
                            <input type="text" name="provinsi" placeholder="Masukkan email Anda" className="dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button className="bg-gray-300 text-gray-700 px-14 py-2 rounded-md hover:bg-gray-400 text-sm">
                        Batal
                    </button>
                    <button type="submit" className="bg-sky-400 hover:bg-sky-500 text-white py-2 px-16 rounded-lg text-sm">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SertifikasiForm
