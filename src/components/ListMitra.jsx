import { useEffect, useState } from 'react'
import { fetchAllMitra, tambahMitra, updateMitra, hapusMitra } from '../api/mitra'
import noImg from '../assets/img/sertifikasi.png'
import { FaUsers, FaStar, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa'

const ListMitra = () => {
  const [mitraList, setMitraList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editForm, setEditForm] = useState(null)
  const [editLogoPreview, setEditLogoPreview] = useState(null)
  const [editLoading, setEditLoading] = useState(false)

  const [tambahForm, setTambahForm] = useState({
    nama: '',
    deskripsi: '',
    alamat: '',
    kota: '',
    provinsi: '',
    notelp: '',
    email: '',
    jumlahPegawai: '',
    logo: null,
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetchAllMitra()
      setMitraList(res.data || [])
    } catch {
      setMitraList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle file logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    setTambahForm((prev) => ({ ...prev, logo: file }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setLogoPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setLogoPreview(null)
    }
  }

  // Handle form submit
  const handleTambahSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    try {
      const formData = new FormData()
      Object.entries(tambahForm).forEach(([key, value]) => {
        if (key === 'logo' && !value) return
        formData.append(key, value)
      })
      await tambahMitra(formData)
      document.getElementById('tambahModal').close()
      setTambahForm({
        nama: '',
        deskripsi: '',
        alamat: '',
        kota: '',
        provinsi: '',
        notelp: '',
        email: '',
        jumlahPegawai: '',
        logo: null,
      })
      setLogoPreview(null)
      fetchData()
    } catch (error) {
      alert('Gagal menambah mitra!')
      console.error('Error adding partner:', error)
    } finally {
      setSubmitLoading(false)
    }
  }

  const openEditModal = (mitra) => {
    setEditForm({
      ...mitra,
      logo: null,
    })
    setEditLogoPreview(mitra.logo ? `${import.meta.env.VITE_BASE_URL}/storage/company/${mitra.logo}` : null)
    document.getElementById('editModal').showModal()
  }

  const handleEditLogoChange = (e) => {
    const file = e.target.files[0]
    setEditForm((prev) => ({ ...prev, logo: file }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setEditLogoPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setEditLogoPreview(null)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    try {
      const formData = new FormData()
      // Masukkan semua field (kecuali logo kosong tidak perlu dikirim)
      Object.entries(editForm).forEach(([key, value]) => {
        if (key === 'logo' && !value) return
        formData.append(key, value)
      })
      await updateMitra(editForm.id, formData)
      document.getElementById('editModal').close()
      setEditForm(null)
      setEditLogoPreview(null)
      fetchData()
    } catch (error) {
      alert('Gagal mengedit mitra!')
      console.error('Error updating partner:', error)
    } finally {
      setEditLoading(false)
    }
  }

  const handleDeleteMitra = async (id) => {
    if (!window.confirm('Yakin ingin menghapus mitra ini?')) return
    try {
      await hapusMitra(id)
      fetchData()
    } catch (error) {
      alert('Gagal menghapus mitra')
      console.error(error)
    }
  }

  if (loading) return <div className="text-center py-10 min-h-screen">Memuat data mitra...</div>
  if (!mitraList.length) return <div className="text-center py-10 text-gray-400">Tidak ada data mitra.</div>

  return (
    <div className="mt-10 mx-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[#333B69] text-xl font-semibold">Mitra Perusahaan</h1>
        <button onClick={() => document.getElementById('tambahModal').showModal()} className="btn bg-sky-400 hover:bg-sky-500 text-white font-light rounded-xl px-8">
          + Tambah
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mitraList.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md border border-sky-400 flex flex-col md:flex-row gap-5 items-start p-5 hover:shadow-lg">
            <img src={item.logo ? `${import.meta.env.VITE_BASE_URL}/storage/company/${item.logo}` : noImg} alt={item.nama} className="w-20 h-20 object-cover rounded-lg bg-white" onError={(e) => (e.target.src = noImg)} />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg mb-1 truncate">{item.nama}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <FaMapMarkerAlt /> {item.kota}, {item.provinsi}
              </div>
              <p className="text-gray-600 text-xs mb-2 truncate">{item.alamat}</p>
              <div className="flex gap-2 text-xs text-gray-500 mb-1">
                <span className="flex items-center gap-1">
                  <FaUsers /> {item.jumlahPegawai} pegawai
                </span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {item.rating} / 5
                </span>
                <span className="flex items-center gap-1">({item.jumlahUlasan} ulasan)</span>
              </div>
              <div className="flex gap-3 mt-2 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <FaEnvelope /> {item.email}
                </span>
              </div>
              <div className="flex gap-3 mt-2 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <FaPhone /> {item.notelp}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="btn btn-outline px-5 py-1 rounded-full text-xs text-blue-600 border-blue-200 hover:bg-blue-50 mt-3" onClick={() => openEditModal(item)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah */}
      <dialog id="tambahModal" className="modal">
        <div className="modal-box max-w-lg">
          <form onSubmit={handleTambahSubmit}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Tambah Mitra</h3>
              <button type="button" className="btn btn-sm btn-circle btn-ghost text-xl" onClick={() => document.getElementById('tambahModal').close()}>
                ✕
              </button>
            </div>
            <hr className="my-3 text-gray-200" />

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Perusahaan</label>
                <input className="input input-bordered w-full" value={tambahForm.nama} onChange={(e) => setTambahForm((f) => ({ ...f, nama: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea className="input input-bordered w-full" value={tambahForm.deskripsi} onChange={(e) => setTambahForm((f) => ({ ...f, deskripsi: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alamat</label>
                <input className="input input-bordered w-full" value={tambahForm.alamat} onChange={(e) => setTambahForm((f) => ({ ...f, alamat: e.target.value }))} required />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Kota</label>
                  <input className="input input-bordered w-full" value={tambahForm.kota} onChange={(e) => setTambahForm((f) => ({ ...f, kota: e.target.value }))} required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Provinsi</label>
                  <input className="input input-bordered w-full" value={tambahForm.provinsi} onChange={(e) => setTambahForm((f) => ({ ...f, provinsi: e.target.value }))} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">No. Telepon</label>
                <input className="input input-bordered w-full" value={tambahForm.notelp} onChange={(e) => setTambahForm((f) => ({ ...f, notelp: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="input input-bordered w-full" type="email" value={tambahForm.email} onChange={(e) => setTambahForm((f) => ({ ...f, email: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jumlah Pegawai</label>
                <input className="input input-bordered w-full" type="number" value={tambahForm.jumlahPegawai} onChange={(e) => setTambahForm((f) => ({ ...f, jumlahPegawai: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo Perusahaan</label>
                <input className="input input-bordered w-full" type="file" accept="image/*" onChange={handleLogoChange} />
                {logoPreview && <img src={logoPreview} alt="Preview Logo" className="w-16 h-16 rounded mt-2" />}
              </div>
            </div>

            <div className="modal-action flex justify-end mt-4">
              <button type="submit" disabled={submitLoading} className="btn bg-sky-400 text-white rounded-full px-10">
                {submitLoading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Modal Edit */}
      <dialog id="editModal" className="modal">
        <div className="modal-box max-w-lg">
          {editForm && (
            <form onSubmit={handleEditSubmit}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Edit Mitra</h3>
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost text-xl"
                  onClick={() => {
                    setEditForm(null)
                    setEditLogoPreview(null)
                    document.getElementById('editModal').close()
                  }}
                >
                  ✕
                </button>
              </div>
              <hr className="my-3 text-gray-200" />
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Perusahaan</label>
                  <input className="input input-bordered w-full" value={editForm.nama} onChange={(e) => setEditForm((f) => ({ ...f, nama: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deskripsi</label>
                  <textarea className="input input-bordered w-full" value={editForm.deskripsi} onChange={(e) => setEditForm((f) => ({ ...f, deskripsi: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Alamat</label>
                  <input className="input input-bordered w-full" value={editForm.alamat} onChange={(e) => setEditForm((f) => ({ ...f, alamat: e.target.value }))} required />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Kota</label>
                    <input className="input input-bordered w-full" value={editForm.kota} onChange={(e) => setEditForm((f) => ({ ...f, kota: e.target.value }))} required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Provinsi</label>
                    <input className="input input-bordered w-full" value={editForm.provinsi} onChange={(e) => setEditForm((f) => ({ ...f, provinsi: e.target.value }))} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">No. Telepon</label>
                  <input className="input input-bordered w-full" value={editForm.notelp} onChange={(e) => setEditForm((f) => ({ ...f, notelp: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input className="input input-bordered w-full" type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jumlah Pegawai</label>
                  <input className="input input-bordered w-full" type="number" value={editForm.jumlahPegawai} onChange={(e) => setEditForm((f) => ({ ...f, jumlahPegawai: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Logo Perusahaan</label>
                  <input className="input input-bordered w-full" type="file" accept="image/*" onChange={handleEditLogoChange} />
                  {editLogoPreview && <img src={editLogoPreview} alt="Preview Logo" className="w-16 h-16 rounded mt-2" />}
                </div>
              </div>
              <div className="modal-action flex justify-between mt-4">
                <button type="button" onClick={() => handleDeleteMitra(editForm.id)} className="btn bg-red-400 text-white rounded-full px-10">
                  Hapus Mitra
                </button>
                <button type="submit" disabled={editLoading} className="btn bg-sky-400 text-white rounded-full px-10">
                  {editLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  )
}

export default ListMitra
