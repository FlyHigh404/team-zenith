import React from 'react'
import { useDropzone } from 'react-dropzone'

const LokerForm = () => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: { 'application/pdf': [], 'image/*': [] },
        maxSize: 30 * 1024 * 1024,
    });

    return (
        <div className="w-2/3 bg-white p-4 rounded-lg mt-10">
            <h1 className="text-xl font-bold mb-4">Lamar Posisi Ini</h1>
            <form className="mt-5 md:mt-10 lg:mt-5">
                <div className="flex gap-4">
                    <div className="w-[60%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Nama Lengkap</label>
                            <input type="text" name="nama" placeholder="Masukkan nama Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                    <div className="w-[40%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Tanggal Lahir</label>
                            <input type="date" name="birthDate" placeholder="Masukkan tanggal lahir" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-[50%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Nomor Telepon</label>
                            <input type="number" name="nomor" placeholder="Masukkan nomor Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Email</label>
                            <input type="text" name="birthDate" placeholder="Masukkan email Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                </div>

                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Alamat</label>
                    <textarea type="text" name="addres" placeholder="Masukkan alamat Anda" className="textarea bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="flex gap-4">
                    <div className="w-[50%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Kota</label>
                            <input type="text" name="kota" placeholder="Masukkan nomor Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <div className="mb-4 md:mb-7 lg:mb-4">
                            <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Provinsi</label>
                            <input type="text" name="provinsi" placeholder="Masukkan email Anda" className="bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                </div>

                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Tentang Anda</label>
                    <textarea type="text" name="addres" placeholder="Masukkan alamat Anda" className="textarea bg-gray-50 dark:bg-[#1D232A] border border-gray-300 text-gray-900 text-sm placeholder:text-sm dark:placeholder:text-[#A5A5A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className="mb-4 md:mb-7 lg:mb-4">
                    <label className="block text-sm md:text-base lg:text-sm font-medium mb-1">Unggah CV / Resume</label>
                    <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center rounded-md cursor-pointer"
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center">
                            <svg className="h-8 w-8 text-gray-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l3-3m-3 3l-3-3m6-3v-2a4 4 0 00-8 0v2" />
                            </svg>
                            <p className="text-sm text-gray-600">PDF, PPT, JPG, or PNG – smaller than 30 MB</p>
                            <p className="text-sm mt-1">Drag and Drop your file here or <span className="text-blue-500 font-medium">Browse file</span></p>
                        </div>
                    </div>
                    {acceptedFiles.length > 0 && (
                        <ul className="mt-3 text-sm text-gray-700">
                            {acceptedFiles.map(file => (
                                <li key={file.path}>{file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB</li>
                            ))}
                        </ul>
                    )}
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

export default LokerForm
