import { useState, useEffect } from 'react'
import { FaMoneyBill, FaClock, FaToolbox, FaNoteSticky } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { fetchAllJobs, updateJob, deleteJob } from '../api/job'
import img from '../assets/img/sertifikasi.png'
import { parseJenisIndustri } from '../utils/parseJenisIndustri'
import { parseDetail } from '../utils/parseDetail'
import ModalTambahJob from './ModalTambahJob'

const ListPekerjaan = () => {
  const [jobList, setJobList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState(null)
  const [editForm, setEditForm] = useState({})

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await fetchAllJobs()
      setJobList(res.data?.data || [])
    } catch (err) {
      setJobList([])
      console.error('Gagal fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // Buka modal detail
  const openDetailModal = (item) => {
    setSelectedJob(item)
    document.getElementById('detailModal').showModal()
  }

  // Buka modal edit & prefill form
  const openEditModal = (item) => {
    const detailParsed = parseDetail(item.detail)
    let keahlianArr = []
    if (Array.isArray(detailParsed['Keahlian Teknis'])) {
      keahlianArr = detailParsed['Keahlian Teknis']
    } else if (typeof detailParsed['Keahlian Teknis'] === 'string') {
      keahlianArr = detailParsed['Keahlian Teknis']
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    } else {
      keahlianArr = []
    }
    setSelectedJob(item)
    setEditForm({
      judul: item.judul || '',
      desc: item.desc || '',
      kualifikasi: item.kualifikasi || '',
      gaji: item.gaji || '',
      durasi_bulan: item.durasi_bulan || '',
      pengalaman: item.pengalaman || '',
      provinsi: item.provinsi || '',
      kota: item.kota || '',
      lokasi: item.lokasi || '',
      detail: keahlianArr.join(', '),
      industri: parseJenisIndustri(item.jenisIndustri).join(', '),
      // gambar: null,
      // gambarPreview: null,
    })
    document.getElementById('editModal').showModal()
  }

  // Handle update job
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      const detailObj = parseDetail(selectedJob.detail)

      formData.append('judul', editForm.judul)
      formData.append('desc', editForm.desc)
      formData.append('gaji', editForm.gaji)
      formData.append('durasi_bulan', editForm.durasi_bulan)
      formData.append('pengalaman', editForm.pengalaman)
      formData.append('provinsi', editForm.provinsi)
      formData.append('kota', editForm.kota)
      formData.append('lokasi', editForm.lokasi)
      formData.append('kualifikasi', editForm.kualifikasi)
      formData.append('detail', JSON.stringify(detailObj))

      detailObj['Keahlian Teknis'] = editForm.detail
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean)
      // === INDUSTRI (array) ===
      editForm.industri
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean)
        .forEach((val) => {
          formData.append('jenisIndustri[]', val)
        })
      // === KEAHLIAN TEKNIS (array) ===
      editForm.detail
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean)
        .forEach((val) => {
          formData.append('detail[Keahlian Teknis]', val)
        })
      // Jika ada upload gambar
      if (editForm.gambar) formData.append('gambar', editForm.gambar)
      await updateJob(selectedJob.id, formData, true) // true agar pakai multipart/form-data
      document.getElementById('editModal').close()
      fetchJobs()
    } catch (error) {
      alert('Gagal update lowongan.')
      console.error(error)
    }
  }

  // Handle delete job
  const handleDelete = async () => {
    if (!window.confirm('Yakin hapus lowongan ini?')) return
    try {
      await deleteJob(selectedJob.id)
      document.getElementById('editModal').close()
      fetchJobs()
    } catch (error) {
      alert('Gagal hapus lowongan.')
      console.error(error)
    }
  }

  if (loading) return <div className="text-center py-10 min-h-screen">Memuat data lowongan...</div>

  return (
    <div className="mt-10 mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#333B69] text-xl font-semibold">Lowongan Saat Ini</h1>
        <button onClick={() => document.getElementById('tambahJobModal').showModal()} className="btn bg-sky-400 hover:bg-sky-500 text-white font-light rounded-xl px-8">
          + Tambah
        </button>
        <ModalTambahJob fetchJob={fetchJobs} />
      </div>

      <div className="mt-5 space-y-4">
        {jobList.length === 0 && <div className="text-center text-gray-400">Belum ada lowongan.</div>}
        {jobList.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
            <div className="p-2">
              <img src={item.perusahaan?.logo ? `${import.meta.env.VITE_BASE_URL}/storage/${item.perusahaan.logo}` : img} alt="" className="w-24 h-24 object-contain rounded bg-white" />
            </div>
            <div className="flex flex-col w-[200px]">
              <p className="font-medium text-base truncate">{item.judul}</p>
              <p className="text-sm text-sky-400">{parseJenisIndustri(item.jenisIndustri)[0] || '-'}</p>
            </div>
            <div className="flex flex-col w-[200px]">
              <p className="font-medium text-base">{item.perusahaan?.nama || '-'}</p>
              <p className="text-sm text-sky-400">Perusahaan</p>
            </div>
            <div className="flex flex-col w-[150px]">
              <p className="font-medium text-base">{parseJenisIndustri(item.jenisIndustri).join(', ') || '-'}</p>
              <p className="text-sm text-sky-400">Industri</p>
            </div>

            <div className="flex flex-col w-[150px]">
              <p className="font-medium text-base">
                {item.lokasi || item.kota || item.provinsi || '-'}, {item.kota}, {item.provinsi}
              </p>
              <p className="text-sm text-sky-400">Lokasi</p>
            </div>
            <div className="p-2">
              <button className="btn btn-outline outline-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-full px-10" onClick={() => openDetailModal(item)}>
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      <dialog id="detailModal" className="modal">
        <div className="modal-box w-full max-w-lg rounded-xl shadow-lg p-6">
          {selectedJob && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <img src={selectedJob.perusahaan?.logo ? `${import.meta.env.VITE_BASE_URL}/storage/${selectedJob.perusahaan.logo}` : img} alt="Logo Perusahaan" className="w-12 h-12 rounded-md bg-gray-200 object-contain" />
                <div>
                  <p className="font-semibold text-base">{selectedJob.perusahaan?.nama || '-'}</p>
                  <p className="text-sm text-gray-500">{selectedJob.lokasi || selectedJob.kota || '-'}</p>
                </div>
              </div>
              <hr className="my-2" />
              <p className="text-lg font-semibold text-sky-700">{selectedJob.judul}</p>
              <div className="flex flex-wrap gap-2 my-2">
                {parseJenisIndustri(selectedJob?.jenisIndustri).map((ind, i) => (
                  <span key={i} className="bg-sky-100 text-sky-700 rounded-full px-2 py-1 text-xs font-semibold">
                    {ind}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-2">
                  <FaClock className="text-sky-400" />
                  <span>{selectedJob.durasi_kategori || `${selectedJob.durasi_bulan} bulan`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaToolbox className="text-sky-400" />
                  <span>{`${selectedJob.durasi_bulan} bulan`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBill className="text-sky-400" />
                  <span>{selectedJob.gaji ? `Rp${selectedJob.gaji.toLocaleString()}` : '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaNoteSticky className="text-sky-400" />
                  <span>Pelamar: {selectedJob.total_applicants || 0}</span>
                </div>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold mb-1">Deskripsi Pekerjaan</h4>
                <p className="text-sm text-gray-700">{selectedJob.desc}</p>
              </div>
              <div className="mb-2">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(parseDetail(selectedJob.detail)).map(([key, list]) => (
                    <div key={key} className="mb-1">
                      <span className="text-md font-bold">{key}: </span>
                      {Array.isArray(list) ? (
                        list.map((item, i) => (
                          <span key={i} className="bg-sky-100 text-sky-700 rounded-full px-2 py-1 text-md font-semibold mr-2">
                            {item}
                          </span>
                        ))
                      ) : (
                        <span>{list}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold mb-1">Kualifikasi</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">{selectedJob.kualifikasi && selectedJob.kualifikasi.split('\n').map((q, i) => <li key={i}>{q.replace(/^- /, '')}</li>)}</ul>
              </div>
              <div className="modal-action flex justify-between mt-6">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:underline"
                  onClick={() => {
                    openEditModal(selectedJob)
                    document.getElementById('detailModal').close()
                  }}
                >
                  Edit
                </button>
                <button className="text-sm text-[#86CEEB] font-medium hover:underline" onClick={() => navigate('/pelamar-pekerjaan')}>
                  Daftar Pelamar
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      {/* EDIT MODAL */}
      <dialog id="editModal" className="modal">
        <div className="modal-box w-full max-w-lg rounded-xl shadow-lg p-6">
          {selectedJob && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Edit Lowongan</h3>
                <button className="btn btn-sm btn-circle btn-ghost text-xl" onClick={() => document.getElementById('editModal').close()}>
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Judul</label>
                    <input className="input input-bordered w-full" name="judul" value={editForm.judul} onChange={(e) => setEditForm({ ...editForm, judul: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Deskripsi</label>
                    <textarea className="input input-bordered w-full h-[100px]" name="desc" value={editForm.desc} onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gaji</label>
                    <input className="input input-bordered w-full" name="gaji" value={editForm.gaji} onChange={(e) => setEditForm({ ...editForm, gaji: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Durasi Pekerjaan Perbulan</label>
                    <input className="input input-bordered w-full" type="number" name="durasi_bulan" value={editForm.durasi_bulan} onChange={(e) => setEditForm({ ...editForm, durasi_bulan: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Minimal Pengalaman Pertahun</label>
                    <input className="input input-bordered w-full" type="number" name="pengalaman" value={editForm.pengalaman} onChange={(e) => setEditForm({ ...editForm, pengalaman: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Lokasi</label>
                    <input className="input input-bordered w-full" name="lokasi" value={editForm.lokasi} onChange={(e) => setEditForm({ ...editForm, lokasi: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Kota</label>
                    <input className="input input-bordered w-full" name="kota" value={editForm.kota} onChange={(e) => setEditForm({ ...editForm, kota: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Provinsi</label>
                    <input className="input input-bordered w-full" name="provinsi" value={editForm.provinsi} onChange={(e) => setEditForm({ ...editForm, provinsi: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Kualifikasi</label>
                    <textarea className="input input-bordered w-full h-[100px]" name="kualifikasi" value={editForm.kualifikasi} onChange={(e) => setEditForm({ ...editForm, kualifikasi: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Keahlian Teknis</label>
                    <input className="input input-bordered w-full" name="detail" value={editForm.detail} onChange={(e) => setEditForm({ ...editForm, detail: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Industri</label>
                    <input className="input input-bordered w-full" name="industri" value={editForm.industri} onChange={(e) => setEditForm({ ...editForm, industri: e.target.value })} />
                    <small className="text-gray-400">Pisahkan dengan koma, misal: Pengelasan, Konstruksi, Migas</small>
                  </div>
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
    </div>
  )
}

export default ListPekerjaan
