import React from 'react'
import { FaUser, FaPenToSquare } from 'react-icons/fa6'
import badgeAdmin from '../assets/img/badgeAdmin.png'
import { getUserData } from '../utils/token'

const InformasiProfil = () => {
  const openModalProfil = () => {
    document.getElementById('modalProfil').showModal()
  }

  const userData = getUserData()

  if (!userData) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col border-gray-300 border rounded-2xl bg-white font-sans">
      <div className="relative">
        <div className="bg-blue-300 h-44 rounded-t-2xl"></div>

        <div className="absolute pl-4 -bottom-12">
          <div className="w-28 h-28 bg-blue-700 rounded-full border-4 border-white "></div>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-10 gap-1">
        <div className="flex flex-col col-span-2 p-4">
          <div className="flex flex-row gap-1 items-center">
            <h2 className="font-semibold text-xl">{userData.nama}</h2>
            {userData.role === 'admin' && <img src={badgeAdmin} alt="Badge Admin" className="w-6" />}
          </div>
          <p className="mt-1">{userData.deskripsi ? userData.deskripsi : 'Belum ada deskripsi'}</p>
          <p className="mt-1">
            {userData.kota}, {userData.provinsi}
          </p>
          <p className="mt-1 text-sky-500">0 Koneksi</p>
          <div className="hidden lg:flex justify-between mt-3">
            <button onClick={openModalProfil} className="flex flex-row gap-2 items-center px-4 py-1 bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-full hover:bg-sky-500">
              <FaPenToSquare className="text-sm" />
              <p className="text-sm font-medium text-white">Edit Profil</p>
            </button>

            <dialog id="modalProfil" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <div className="flex flex-row ">
                    <h3 className="font-semibold">Edit Profil</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
                  </div>
                </form>
                <hr className="my-3 text-gray-200" />

                <div className="my-2 space-y-2">
                  {[
                    { label: 'Nama Lengkap', type: 'input' },
                    { label: 'Bidang Pekerjaan', type: 'input' },
                    { label: 'Provinsi', type: 'select', options: ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur'] },
                    { label: 'Kota', type: 'select', options: ['Bandung', 'Semarang', 'Surabaya'] },
                    // { label: "Kemampuan yang dimiliki", type: "input" },
                    // { label: "Sertifikasi", type: "select", options: ["TOEFL", "IELTS", "Kompetensi Digital"] },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="font-medium text-sm">{field.label}</label>
                      {field.type === 'select' ? (
                        <select className="select select-bordered w-full mt-1.5 rounded-lg">
                          <option disabled selected>
                            {field.label}
                          </option>
                          {field.options.map((option, idx) => (
                            <option key={idx}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input className="input input-bordered w-full mt-1.5 rounded-lg" placeholder={field.label} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="modal-action flex justify-end">
                  <button className="btn bg-sky-400 text-white rounded-full px-10">Simpan</button>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        <div className="flex flex-col ol-span-1 p-4">
          <div className="flex flex-row gap-1">
            <FaUser className="mt-1" />
            <div className="flex flex-col ml-2">
              <p className="font-semibold">Username</p>
              <p className="italic">@{userData.username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformasiProfil
