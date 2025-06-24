import { useState, useEffect } from 'react'
import { allCompanyList } from '../api/dashboard'
import { addJob } from '../api/job'

const ModalTambahJob = ({ fetchJob }) => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    perusahaan_id: '',
    judul: '',
    desc: '',
    durasi_bulan: '',
    pengalaman: '',
    lokasi: '',
    provinsi: '',
    kota: '',
    jenisIndustri: '',
    gaji: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    kualifikasi: '',
    keahlianTeknis: '',
    material: '',
  })

  useEffect(() => {
    allCompanyList().then((res) => {
      setCompanies(res.data || [])
      setLoading(false)
    })
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append('perusahaan_id', form.perusahaan_id)
      data.append('judul', form.judul)
      data.append('desc', form.desc)
      data.append('durasi_bulan', form.durasi_bulan)
      data.append('pengalaman', form.pengalaman)
      data.append('lokasi', form.lokasi)
      data.append('provinsi', form.provinsi)
      data.append('kota', form.kota)
      form.jenisIndustri
        .split(',')
        .map((ind) => ind.trim())
        .filter(Boolean)
        .forEach((ind) => data.append('jenisIndustri[]', ind))
      data.append('gaji', form.gaji)
      data.append('tanggalMulai', form.tanggalMulai)
      data.append('tanggalSelesai', form.tanggalSelesai)
      data.append('kualifikasi', form.kualifikasi)
      form.keahlianTeknis
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .forEach((v) => data.append('detail[Keahlian Teknis]', v))
      form.material
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .forEach((v) => data.append('detail[Material]', v))
      // gambar null, tidak diisi
      await addJob(data)
      document.getElementById('tambahJobModal').close()
      fetchJob && fetchJob()
    } catch (error) {
      alert('Gagal tambah Job!')
      console.error('Error adding Job:', error)
    }
  }

  return (
    <dialog id="tambahJobModal" className="modal">
      <div className="modal-box w-full max-w-lg rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Tambah Job Baru</h3>
          <button className="btn btn-sm btn-circle btn-ghost text-xl" onClick={() => document.getElementById('tambahJobModal').close()}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Perusahaan</label>
              {loading ? (
                <select className="input input-bordered w-full" disabled>
                  <option value="">Memuat perusahaan...</option>
                </select>
              ) : null}
              <select className="input input-bordered w-full" name="perusahaan_id" value={form.perusahaan_id} onChange={handleChange} required>
                <option value="">Pilih Perusahaan</option>
                {companies.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <input className="input input-bordered w-full" name="judul" value={form.judul} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea className="input input-bordered w-full h-[60px]" name="desc" value={form.desc} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Durasi (bulan)</label>
              <input className="input input-bordered w-full" name="durasi_bulan" value={form.durasi_bulan} onChange={handleChange} required type="number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pengalaman (tahun)</label>
              <input className="input input-bordered w-full" name="pengalaman" value={form.pengalaman} onChange={handleChange} required type="number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lokasi</label>
              <input className="input input-bordered w-full" name="lokasi" value={form.lokasi} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kota</label>
              <input className="input input-bordered w-full" name="kota" value={form.kota} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Provinsi</label>
              <input className="input input-bordered w-full" name="provinsi" value={form.provinsi} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Industri</label>
              <input className="input input-bordered w-full" name="jenisIndustri" value={form.jenisIndustri} onChange={handleChange} placeholder="Pisahkan dengan koma" required />
              <small>Contoh: "Teknologi, Industri, Manufaktur, dll"</small>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gaji</label>
              <input className="input input-bordered w-full" name="gaji" type="number" value={form.gaji} onChange={handleChange} required />
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
                <input className="input input-bordered w-full" type="date" name="tanggalMulai" value={form.tanggalMulai} onChange={handleChange} required />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Tanggal Selesai</label>
                <input className="input input-bordered w-full" type="date" name="tanggalSelesai" value={form.tanggalSelesai} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kualifikasi</label>
              <textarea className="input input-bordered w-full h-[60px]" name="kualifikasi" value={form.kualifikasi} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Keahlian Teknis</label>
              <input className="input input-bordered w-full" name="keahlianTeknis" value={form.keahlianTeknis} onChange={handleChange} />
            </div>
          </div>
          <div className="modal-action flex justify-end mt-6">
            <button type="submit" className="btn bg-sky-400 text-white rounded-full px-10">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default ModalTambahJob
