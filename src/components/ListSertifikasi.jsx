import React, { useEffect, useState } from 'react'
import img from '../assets/img/sertifikasi.png'
import { FaRegBookmark, FaClock, FaToolbox, FaCalendar, FaShare, FaLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { getAllSertifikasi, createSertifikasi, updateSertifikasi, deleteSertifikasi } from '../api/sertifikasi'

const ListSertifikasi = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [editGambarPreview, setEditGambarPreview] = useState(null)

  const navigate = useNavigate()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getAllSertifikasi()
      setList(res.data?.data || [])
    } catch (err) {
      console.error('Gagal fetch data:', err)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatJamUTC = (isoString) => {
    if (!isoString) return '-'
    const d = new Date(isoString)
    const hours = d.getUTCHours().toString().padStart(2, '0')
    const minutes = d.getUTCMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const openDetailModal = (item) => {
    setSelected(item)
    document.getElementById('detailModal').showModal()
  }

  const openEditModal = (item) => {
    setSelected(item)
    setEditForm({
      judul: item.judul || '',
      bidang: item.bidang || '',
      jenisSertifikat: item.jenisSertifikat || '',
      tanggalMulai: item.tanggalMulai?.slice(0, 10) || '',
      tanggalSelesai: item.tanggalSelesai?.slice(0, 10) || '',
      jamMulai: item.jamMulai ? formatJamUTC(item.jamMulai) : '',
      jamSelesai: item.jamSelesai ? formatJamUTC(item.jamSelesai) : '',
      lokasi: item.lokasi || '',
      metode: item.metode || '',
      deskripsi: item.deskripsi || '',
      sertifikatDidapat: item.sertifikatDidapat || '',
      syaratPeserta: item.syaratPeserta || '',
      fasilitas: item.fasilitas || '',
      kuota: item.kuota || '',
      catatan: item.catatan || '',
      gambar: null,
      detail: item.detail || '',
    })
    document.getElementById('editModal').showModal()
  }

  const handleEditGambarChange = (e) => {
    const file = e.target.files[0]
    setEditForm((prev) => ({ ...prev, gambar: file }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setEditGambarPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setEditGambarPreview(null)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const formatJam = (jam) => {
      if (!jam) return ''
      return jam.split(':').slice(0, 2).join(':')
    }

    try {
      const formData = new FormData()
      if (editForm.gambar) formData.append('gambar', editForm.gambar)
      for (const key in editForm) {
        if (key === 'gambar') continue
        if (key === 'jamMulai' || key === 'jamSelesai') {
          formData.append(key, formatJam(editForm[key]))
        } else {
          formData.append(key, editForm[key])
        }
      }

      await updateSertifikasi(selected.id, formData, true)
      document.getElementById('editModal').close()
      fetchData()
    } catch (error) {
      alert('Gagal update sertifikasi.')
      console.error('❌ Error saat submit:', error.response?.data || error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteSertifikasi(selected.id)
      document.getElementById('editModal').close()
      fetchData()
    } catch (err) {
      console.error('Gagal hapus:', err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataBaru = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataBaru.append(key, value)
        }
      })

      await createSertifikasi(formDataBaru, true)
      document.getElementById('tambahModal').close()
      fetchData()
    } catch (error) {
      alert('Gagal menambahkan sertifikasi.')
      console.error('❌ Error saat submit:', error.response?.data || error)
    }
  }

  const fields = [
    'judul', 'bidang', 'jenisSertifikat', 'tanggalMulai', 'jamMulai',
    'tanggalSelesai', 'jamSelesai', 'lokasi', 'metode', 'deskripsi',
    'sertifikatDidapat', 'syaratPeserta', 'fasilitas', 'kuota', 'catatan', 'detail'
  ];

  const placeholders = {
    judul: 'Masukkan Judul Sertifikasi',
    bidang: 'Masukkan Bidang Sertifikasi',
    jenisSertifikat: 'Masukkan Jenis Sertifikat',
    tanggalMulai: 'Pilih Tanggal Mulai',
    tanggalSelesai: 'Pilih Tanggal Selesai',
    jamMulai: 'Pilih Jam Mulai',
    jamSelesai: 'Pilih Jam Selesai',
    lokasi: 'Masukkan Lokasi Anda',
    metode: 'Masukkan Metode Sertifikasi',
    deskripsi: 'Masukkan Deskripsi Sertifikasi',
    sertifikatDidapat: 'Masukkan Nama Sertifikat yang Diperoleh',
    syaratPeserta: 'Masukkan Syarat Peserta',
    fasilitas: 'Masukkan Fasilitas yang Didapat',
    kuota: 'Masukkan Kuota Peserta',
    catatan: 'Masukkan Catatan Tambahan',
    detail: 'Masukkan Detail Tambahan',
  };

  if (loading) return <div className="text-center py-10 min-h-screen">Memuat data sertifikasi...</div>

  return (
    <div className="mt-10 mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#333B69] text-xl font-semibold">Sertifikasi Saat Ini</h1>
        <button onClick={() => document.getElementById('tambahModal').showModal()} className="btn bg-sky-400 hover:bg-sky-500 text-white font-light rounded-xl px-8">
          + Tambah
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {list.length === 0 && <div className="text-center text-gray-400 min-h-screen">Belum ada sertifikasi.</div>}
        {list.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
            <img src={item.gambar ? `${import.meta.env.VITE_BASE_URL}/storage/${item.gambar}` : img} alt="" className="w-24 h-24 object-contain rounded bg-white" />
            <div className="flex flex-col w-[200px] mx-8">
              <p className="font-medium text-base truncate">{item.judul}</p>
              <p className="text-sm text-sky-400 truncate">{item.jenisSertifikat}</p>
            </div>
            <div className="flex flex-col w-[150px]">
              <p className="font-medium text-base">{item.bidang}</p>
              <p className="text-sm text-sky-400">Bidang</p>
            </div>
            <div className="flex flex-col w-[150px]">
              <p className="font-medium text-base">{new Date(item.tanggalMulai).toLocaleDateString('id-ID')}</p>
              <p className="text-sm text-sky-400">Tanggal</p>
            </div>
            <div className="flex flex-col w-[100px]">
              <p className="font-medium text-base">{formatJamUTC(item.jamMulai)}</p>
              <p className="text-sm text-sky-400">Jam</p>
            </div>
            <div className="flex flex-col w-[150px]">
              <p className="font-medium text-base">{item.lokasi}</p>
              <p className="text-sm text-sky-400">Lokasi</p>
            </div>
            <div className="p-2">
              <button className="btn btn-outline outline-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-full px-10 whitespace-nowrap" onClick={() => openDetailModal(item)}>
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      <dialog id="detailModal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          {selected && (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <img src={img} className="w-16 h-16 object-contain" />
                  <div>
                    <p className="font-semibold text-xl">{selected.judul}</p>
                    <p className="text-sm text-gray-500">
                      {selected.bidang} • {selected.jenisSertifikat}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-gray-400">
                  <FaRegBookmark className="text-xl cursor-pointer" />
                  <FaShare className="text-xl cursor-pointer" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-sky-400" />
                  <div>
                    <p className="text-sm text-gray-400">Tanggal</p>
                    <p className="text-base font-medium">{new Date(selected.tanggalMulai).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-sky-400" />
                  <div>
                    <p className="text-sm text-gray-400">Jam</p>
                    <p className="text-base font-medium">{formatJamUTC(selected.jamMulai)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-sky-400" />
                  <div>
                    <p className="text-sm text-gray-400">Lokasi</p>
                    <p className="text-base font-medium">{selected.lokasi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaToolbox className="text-sky-400" />
                  <div>
                    <p className="text-sm text-gray-400">Metode</p>
                    <p className="text-base font-medium">{selected.metode}</p>
                  </div>
                </div>
              </div>
              {selected.deskripsi && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-1">Deskripsi</p>
                  <p className="text-base">{selected.deskripsi}</p>
                </div>
              )}
              <div className="modal-action flex justify-between mt-6">
                <button
                  className="btn text-gray-500"
                  onClick={() => {
                    openEditModal(selected)
                    document.getElementById('detailModal').close()
                  }}
                >
                  Edit
                </button>
                <button className="btn text-sky-500" onClick={() => navigate('/pelamar-sertifikasi')}>
                  Daftar Pelamar
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      {/* Modal Edit */}
      <dialog id="editModal" className="modal">
        <div className="modal-box w-full h-135 max-w-lg rounded-xl shadow-lg p-6">
          {selected && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Edit Sertifikasi</h3>
                <button className="btn btn-sm btn-circle btn-ghost text-xl" onClick={() => document.getElementById('editModal').close()}>
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-3">
                  {[
                    'judul', 'bidang', 'jenisSertifikat', 'tanggalMulai', 'jamMulai',
                    'tanggalSelesai', 'jamSelesai', 'lokasi', 'metode', 'deskripsi'
                  ].map((field, i) => {
                    const labelText = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                    return (
                      <div key={i}>
                        <label className="block text-sm font-medium mb-1">{labelText}</label>
                        {field.includes('tanggal') ? (
                          <input
                            type="date"
                            name={field}
                            className="input input-bordered w-full"
                            value={editForm?.[field] || ''}
                            onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                          />
                        ) : field.includes('jam') ? (
                          <input
                            type="time"
                            name={field}
                            className="input input-bordered w-full"
                            value={editForm?.[field] || ''}
                            onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                          />
                        ) : (
                          <input
                            type="text"
                            name={field}
                            className="input input-bordered w-full"
                            value={editForm?.[field] || ''}
                            onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                          />
                        )}
                      </div>
                    )
                  })}

                  <input
                    type="file"
                    name="gambar"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleEditGambarChange}
                  />
                  {editGambarPreview && (
                    <img src={editGambarPreview} alt="Preview" className="w-16 h-16 rounded mt-2" />
                  )}
                </div>

                <div className="modal-action flex justify-between mt-6">
                  <button type="button" className="btn bg-red-500 text-white rounded-full px-10" onClick={handleDelete}>
                    Hapus
                  </button>
                  <button type="submit" className="btn bg-sky-400 text-white rounded-full px-10">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </dialog>

      {/* Modal Tambah Sertifikasi */}
      <dialog id="tambahModal" className="modal">
        <div className="modal-box w-full h-135 max-w-lg rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Tambah Sertifikasi</h3>
            <button className="btn btn-sm btn-circle btn-ghost text-xl" onClick={() => document.getElementById('tambahModal').close()}>
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              {fields.map((field, i) => {
                const labelText = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const placeholder = placeholders[field] || '';

                return (
                  <div key={i}>
                    <label className="block text-sm font-medium mb-1">{labelText}</label>
                    {field.includes('tanggal') ? (
                      <input
                        type="date"
                        name={field}
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        placeholder={placeholder}
                      />
                    ) : field.includes('jam') ? (
                      <input
                        type="time"
                        name={field}
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        placeholder={placeholder}
                      />
                    ) : field === 'kuota' ? (
                      <input
                        type="number"
                        name={field}
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        placeholder={placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        name={field}
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        placeholder={placeholder}
                      />
                    )}
                  </div>
                );
              })}

              <div>
                <label className="block text-sm font-medium mb-1">Gambar Sertifikasi</label>
                <input type="file" name="gambar" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setFormData({ ...formData, gambar: e.target.files[0] })} />
              </div>
            </div>
            <div className="modal-action mt-6 flex justify-end">
              <button type="submit" className="btn bg-sky-400 text-white rounded-full px-10">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default ListSertifikasi
