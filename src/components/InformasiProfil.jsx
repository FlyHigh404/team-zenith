import { useEffect, useState } from 'react'
import { FaUser, FaPenToSquare, FaCamera, FaImages, FaTrash } from 'react-icons/fa6'
import badgeAdmin from '../assets/img/badgeAdmin.png'
import { getUserData } from '../utils/token'
import { listKoneksi } from '../api/beranda'
import { getProfil, updateProfil, deleteFotoProfil } from '../api/profil'
import defaultProfilePic from '../assets/img/defaultProfilePic.png';

const InformasiProfil = () => {
  const userData = getUserData()
  const myUserId = userData?.id
  const [totalKoneksi, setTotalKoneksi] = useState(0)
  const [profilPic, setProfilPic] = useState(null) //
  const [dataProfil, setDataProfil] = useState(null) //
  const [ubahProfil, setUbahProfil] = useState(null) 
  const [hapusFotoProfil, setHapusFotoProfil] = useState(null)

  const [formNama, setFormNama] = useState("")
  const [formTanggalLahir, setFormTanggalLahir] = useState("")
  const [formProvinsi, setFormProvinsi] = useState("")
  const [formKota, setFormKota] = useState("")
  const [formKelas, setFormKelas] = useState("")
  const [formKeahlian, setFormKeahlian] = useState("")
  const [formDeskripsi, setFormDeskripsi] = useState("")

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await getProfil()
        setDataProfil(res.data)
        // console.log('isi data', res.data)
      } catch (error) {
        console.error("Gagal ambil data user dari API:", error)
      }
    }

    fetchDataUser()
  }, [])

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
  
  // const handleUploadPhoto = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     console.log('Foto berhasil di-upload:', imageURL);
  //     setProfilPic(imageURL);
  //   }
  // };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('fotoProfil', file) // Sesuaikan key-nya dengan yang backend kamu pakai

    try {
      const response = await updateProfil(formData)
      setProfilPic(URL.createObjectURL(file))
      setDataProfil(response.data)
      console.log('Foto profil berhasil diupdate:', response)
    } catch (error) {
      console.error('Gagal upload foto profil:', error)
    }
  }

  const handleDeletePhoto = async () => {
    try {
      const response = await deleteFotoProfil()
      setProfilPic(null)
      const updatedUser = { ...getUserData(), foto_profil: null }
      setHapusFotoProfil(updatedUser)
      console.log('Foto profil berhasil dihapus:', response)
    } catch (error) {
      console.error('Gagal hapus foto profil:', error)
    }
  }

  const openModalProfil = () => {
    setFormNama(dataProfil?.nama || "")
    setFormProvinsi(dataProfil?.provinsi || "")
    setFormKota(dataProfil?.kota || "")
    setFormKelas(dataProfil?.kelas || "")
    setFormKeahlian(dataProfil?.keahlian || "")
    setFormTanggalLahir(dataProfil?.tanggal_lahir || "")
    setFormDeskripsi(dataProfil?.deskripsi || "")
    console.log("Data dari API pas klik Edit Profil:", dataProfil)
    document.getElementById('modalProfil').showModal()
  }

  // useEffect(() => {
  //   if (dataProfil) {
  //     setFormNama(dataProfil.nama || "")
  //     setFormProvinsi(dataProfil.provinsi || "")
  //     setFormKota(dataProfil.kota || "")
  //     setFormKelas(dataProfil.kelas || "")
  //     setFormKeahlian(dataProfil.keahlian || "")
  //     setFormTanggalLahir(dataProfil.tanggal_lahir || "")
  //     setFormDeskripsi(dataProfil.deskripsi || "")
  //   }
  // }, [dataProfil])

  // const openModalProfil = () => {
  //   console.log("Data dari API pas klik Edit Profil:", dataProfil)
  //   document.getElementById('modalProfil').showModal()
  // }

  const handleSimpanProfil = async () => {
    try {
      const formData = new FormData()
      formData.append("nama", formNama)
      formData.append("provinsi", formProvinsi)
      formData.append("kota", formKota)
      formData.append("kelas", formKelas)
      formData.append("keahlian", formKeahlian)
      formData.append("tanggal_lahir", formTanggalLahir)
      formData.append("deskripsi", formDeskripsi)

      await updateProfil(formData)
      const updatedUser = await getProfil()
      setUbahProfil(updatedUser)

      alert("Profil berhasil diupdate!")
      document.getElementById('modalProfil').close()
    } catch (error) {
      console.error(error)
      alert("Gagal update profil.")
    }
  }

  return (
    <div className="flex flex-col border-gray-300 border rounded-2xl bg-white font-sans">
      <div className="relative">
        <div className="bg-blue-300 h-44 rounded-t-2xl"></div>
          <button onClick={openModalEditProfilPic} className="absolute pl-4 -bottom-12 cursor-pointer">
            <img 
              src={profilPic || userData.foto_profil || defaultProfilePic} 
              alt="Profil" 
              className="w-28 h-28 object-cover rounded-full border-4 border-white" 
            />
          </button>
          <dialog id="modalEditProfilPic" className="modal">
            <div className="modal-box bg-gray-100">
                <form method="dialog">
                    <div className="flex flex-row ">
                        <h3 className="font-semibold">Edit Foto Profil</h3>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
                    </div>
                </form>
                <hr className='my-3 text-gray-200' />
                
                <div className="flex rounded-full py-12 justify-self-center">
                    <img 
                      src={profilPic || userData.foto_profil || defaultProfilePic} 
                      alt="Profil" 
                      className="w-40 h-40 object-cover rounded-full" 
                    />
                </div>
                
                <hr className='my-3 text-gray-200' />
                <div className="flex flex-row flex-wrap justify-between">
                    <div className="flex flex-row gap-3">
                        <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-200">
                            <label htmlFor="uploadProfilePic" className="flex items-center gap-2 cursor-pointer">
                                <FaCamera />
                                <p className="text-sm">Ambil Foto</p>
                            </label>
                            <input
                                id="uploadProfilePic"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleUploadPhoto}
                            />
                        </div>
                        <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-200">
                            <label htmlFor="uploadProfilePic" className="flex items-center gap-2 cursor-pointer">
                                <FaImages />
                                <p className="text-sm">Unggah Foto</p>
                            </label>
                            <input
                                id="uploadProfilePic"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleUploadPhoto}
                            />
                        </div>
                    </div>
        
                    <button
                      onClick={handleDeletePhoto}
                      className="flex flex-row gap-2 items-center p-2 rounded-md hover:bg-[#FFE5E5] cursor-pointer"
                    >
                      <FaTrash className="text-red-600" />
                      <p className="text-sm text-red-600">Hapus</p>
                    </button>
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
            <button onClick={openModalProfil} className="flex flex-row gap-2 items-center px-4 py-1 bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-full hover:bg-sky-500 cursor-pointer">
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
                  <div>
                    <label className="font-medium text-sm">Nama Lengkap</label>
                    <input
                      value={formNama}
                      onChange={(e) => setFormNama(e.target.value)}
                      className="input input-bordered w-full mt-1.5 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={formTanggalLahir}
                      onChange={(e) => setFormTanggalLahir(e.target.value)}
                      className="input input-bordered w-full mt-1.5 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm">Provinsi</label>
                    <select
                      value={formProvinsi}
                      onChange={(e) => setFormProvinsi(e.target.value)}
                      className="select select-bordered w-full mt-1.5 rounded-lg"
                    >
                      <option disabled value="">Pilih provinsi</option>
                      <option>Jawa Barat</option>
                      <option>Jawa Tengah</option>
                      <option>Jawa Timur</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Kota</label>
                    <select
                      value={formKota}
                      onChange={(e) => setFormKota(e.target.value)}
                      className="select select-bordered w-full mt-1.5 rounded-lg"
                    >
                      <option disabled value="">Pilih kota</option>
                      <option>Bandung</option>
                      <option>Semarang</option>
                      <option>Surabaya</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Kelas</label>
                    <select
                      value={formKelas}
                      onChange={(e) => setFormKelas(e.target.value)}
                      className="select select-bordered w-full mt-1.5 rounded-lg"
                    >
                      <option disabled value="">Pilih kelas</option>
                      {["1F", "2F", "3F", "4F", "1G", "2G", "3G", "4G", "1G pipa", "2G pipa", "5G", "6G", "SMAW", "GMAW", "FCAW", "GTAW"].map((val) => (
                        <option key={val}>{val}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Keahlian</label>
                    <select
                      value={formKeahlian}
                      onChange={(e) => setFormKeahlian(e.target.value)}
                      className="select select-bordered w-full mt-1.5 rounded-lg"
                    >
                      <option disabled value="">Pilih keahlian</option>
                      <option>Plate</option>
                      <option>Pipe</option>
                      <option>Fillet</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm">Deskripsi Profil</label>
                    <textarea
                      value={formDeskripsi}
                      onChange={(e) => setFormDeskripsi(e.target.value)}
                      className="textarea textarea-bordered w-full mt-2 rounded-lg h-16"
                      placeholder="Tulis sedikit tentang dirimu..."
                    ></textarea>
                  </div>
                </div>

                <div className="modal-action flex justify-end">
                  <button 
                    onClick={handleSimpanProfil}
                    className="btn bg-sky-400 text-white rounded-full px-10">Simpan</button>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        <div className="flex flex-col col-span-1 p-4">
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
