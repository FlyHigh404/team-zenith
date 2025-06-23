import React, { useEffect, useState } from 'react'
import { FaUser, FaPenToSquare, FaCamera, FaImages, FaTrash } from 'react-icons/fa6'
import badgeAdmin from '../assets/img/badgeAdmin.png'
import { getUserData } from '../utils/token'
import { listKoneksi } from '../api/beranda'
import defaultProfilePic from "../assets/img/defaultProfilePic.png";

const InformasiProfil = () => {
  const userData = getUserData()
  const myUserId = userData?.id
  const [totalKoneksi, setTotalKoneksi] = useState(0)
  const openModalProfil = () => {
    document.getElementById('modalProfil').showModal()
  }

  useEffect(() => {
    const fetchKoneksi = async () => {
      try {
        const res = await listKoneksi()
        const diterima = (res.data || []).filter((conn) => conn.status === 'diterima' && (conn.user_id === myUserId || conn.koneksi_user_id === myUserId))
        console.log('Daftar koneksi diterima:', diterima)
        setTotalKoneksi(diterima.length)
      } catch (error) {
        setTotalKoneksi(0)
        console.error('Gagal mengambil daftar koneksi:', error)
      }
    }
    if (myUserId) fetchKoneksi()
  }, [myUserId])

  if (!userData) {
    return <p>Loading...</p>
  }

  const openModalEditProfilPic = () => {
      document.getElementById("modalEditProfilPic").showModal()
  }

  const [profilPic, setProfilPic] = useState(null);
  
  const handleUploadPhoto = (e) => {
      const file = e.target.files[0];
      if (file) {
          const imageURL = URL.createObjectURL(file);
          setProfilPic(imageURL);
      }
  };

  const removePhoto = () => {
      setProfilPic(null)
  }

  return (
    <div className="flex flex-col border-gray-300 border rounded-2xl bg-white font-sans">
      <div className="relative">
        <div className="bg-blue-300 h-44 rounded-t-2xl"></div>

          <button onClick={openModalEditProfilPic} className="absolute pl-4 -bottom-12">
                        
            <div className="w-28 h-28 bg-blue-700 rounded-full border-4 border-white cursor-pointer"></div>
        
            {profilPic ? (
                <img 
                    src={profilPic || defaultProfilePic} 
                    alt="Profil" 
                    className="w-28 h-28 rounded-full border-4 border-white cursor-pointer" 
                />
            ) : null}
        </button>

        <dialog id="modalEditProfilPic" className="modal">
          <div className="modal-box">
              <form method="dialog">
                  <div className="flex flex-row ">
                      <h3 className="font-semibold">Edit Profil</h3>
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
                  </div>
              </form>
              <hr className='my-3 text-gray-200' />
              
              <div className="flex rounded-full my-12 justify-self-center">
                  {profilPic ? (
                      <img 
                          src={profilPic || defaultProfilePic} 
                          alt="Profil" 
                          className="w-40 h-40 object-cover" 
                      />
                  ) : null}
              </div>
              
              <hr className='my-3 text-gray-200' />
              <div className="flex flex-row flex-wrap justify-between">
                  <div className="flex flex-row gap-3">
                      <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
                          <label htmlFor="uploadGambar" className="flex items-center gap-2 cursor-pointer">
                              <FaCamera />
                              <p className="text-sm">Ambil Foto</p>
                          </label>
                          <input
                              id="uploadGambar"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleUploadPhoto}
                          />
                      </div>
                      <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
                          <label htmlFor="uploadGambar" className="flex items-center gap-2 cursor-pointer">
                              <FaImages />
                              <p className="text-sm">Upload Foto</p>
                          </label>
                          <input
                              id="uploadGambar"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleUploadPhoto}
                          />
                      </div>
                  </div>
      
                  <a href="#hapus">
                      <button className="flex flex-row gap-2 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-[#FFE5E5] cursor-pointer">
                          <FaTrash className="text-red-600"/>
                          <p className="text-sm text-red-600">Hapus</p>
                      </button>
                  </a>
              </div>
          </div>
        </dialog>
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
          <p className="mt-1 text-sky-500">{totalKoneksi} Koneksi</p>
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
                      { label: "Nama Lengkap", type: "input" },
                      { label: "Provinsi", type: "select", options: ["Jawa Barat", "Jawa Tengah", "Jawa Timur"] },
                      { label: "Kota", type: "select", options: ["Bandung", "Semarang", "Surabaya"] },
                      { label: "Bidang Pekerjaan", type: "select", options: ["Inspector", "Welder"] },
                      { label: "Kelas", type: "select", options: ["1f, 2f, 2g, 5g"] },
                      { label: "Keahlian", type: "select", options: ["Plate, Pipe, Fillet"] },
                  ].map((field, i) => (
                      <React.Fragment key={i}>
                          <label className="font-medium text-sm">{field.label}</label>
                          {field.type === "select" ? (
                              <select className="select select-bordered w-full mt-1.5 rounded-lg">
                              <option disabled selected>{field.label}</option>
                              {field.options.map((option, idx) => (
                                  <option key={idx}>{option}</option>
                              ))}
                              </select>
                          ) : (
                              <input className="input input-bordered w-full mt-1.5 rounded-lg" placeholder={field.label} />
                          )}

                          {i === 0 && (
                              <div>
                                  <label className="font-medium text-sm">Tanggal Lahir</label>
                                  <input
                                      type="date"
                                      className="input input-bordered w-full mt-1.5 rounded-lg"
                                  />
                              </div>
                          )}
                      </React.Fragment>
                  ))}

                  {/* Deskripsi Profil*/}
                  <div>
                      <label className="font-medium text-sm">Deskripsi Profil</label>
                      <textarea
                          className="textarea textarea-bordered w-full mt-2 rounded-lg h-16"
                          placeholder="Tulis sedikit tentang dirimu..."
                      ></textarea>
                  </div>
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
