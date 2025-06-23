import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { applyLoker } from '../api/forum'
import { useNavigate } from 'react-router-dom'

const LokerForm = ({ job, user }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nama: user?.nama || '',
    tanggalLahir: '',
    notelp: user?.notelp || '',
    email: user?.email || '',
    alamat: '',
    provinsi: user?.provinsi || '',
    kota: user?.kota || '',
    tentang: '',
    cv: null,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const isAdmin = user?.role === 'admin'

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': [], 'image/*': [] },
    maxSize: 30 * 1024 * 1024,
    onDrop: (files) => setForm((prev) => ({ ...prev, cv: files[0] })),
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isAdmin) return

    setLoading(true)
    setError(null)

    const body = new FormData()
    body.append('nama', form.nama)
    body.append('tanggalLahir', form.tanggalLahir)
    body.append('notelp', form.notelp)
    body.append('email', form.email)
    body.append('alamat', form.alamat)
    body.append('provinsi', form.provinsi)
    body.append('kota', form.kota)
    body.append('tentang', form.tentang)
    if (form.cv) body.append('cv', form.cv)

    try {
      await applyLoker(job.id, body)
      setSuccess(true)
      setTimeout(() => navigate('/list-loker'), 2000)
    } catch (err) {
      setError('Gagal mengirim lamaran. Pastikan semua data benar.')
      console.error('Error applying for job:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="md:w-2/3 w-full bg-white p-4 rounded-lg md:mt-10 shadow">
      <h1 className="text-xl font-bold mb-4">Lamar Posisi Ini</h1>
      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-6">Lamaran berhasil dikirim!</div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* nama */}
          <div>
            <label className="block mb-1 font-medium">Nama Lengkap</label>
            <input name="nama" value={form.nama} onChange={handleChange} required disabled className="input input-bordered w-full" />
          </div>
          {/* tanggal lahir */}
          <div>
            <label className="block mb-1 font-medium">Tanggal Lahir</label>
            <input type="date" name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} required className="input input-bordered w-full" />
          </div>
          {/* notelp & email */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Nomor Telepon</label>
              <input name="notelp" value={form.notelp} onChange={handleChange} required className="input input-bordered w-full" />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Email</label>
              <input name="email" value={form.email} onChange={handleChange} required className="input input-bordered w-full" />
            </div>
          </div>
          {/* alamat */}
          <div>
            <label className="block mb-1 font-medium">Alamat</label>
            <textarea name="alamat" value={form.alamat} onChange={handleChange} required className="textarea textarea-bordered w-full"></textarea>
          </div>
          {/* provinsi & kota */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Kota</label>
              <input name="kota" value={form.kota} onChange={handleChange} required className="input input-bordered w-full" />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Provinsi</label>
              <input name="provinsi" value={form.provinsi} onChange={handleChange} required className="input input-bordered w-full" />
            </div>
          </div>
          {/* tentang */}
          <div>
            <label className="block mb-1 font-medium">Tentang Anda</label>
            <textarea name="tentang" value={form.tentang} onChange={handleChange} required className="textarea textarea-bordered w-full"></textarea>
          </div>
          {/* CV */}
          <div>
            <label className="block mb-1 font-medium">Unggah CV / Resume</label>
            <div {...getRootProps()} className="border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center rounded-md cursor-pointer">
              <input {...getInputProps()} />
              <p className="text-sm text-gray-600">PDF, JPG, PNG – max 30 MB</p>
              <p className="text-sm mt-1">
                Drag & drop atau <span className="text-blue-500 font-medium">browse file</span>
              </p>
            </div>
            {form.cv && (
              <p className="mt-2 text-xs text-gray-700">
                {form.cv.name} - {(form.cv.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" className="bg-gray-300 text-gray-700 px-8 py-2 rounded-md hover:bg-gray-400 text-sm" onClick={() => navigate(-1)}>
              Batal
            </button>
            <button type="submit" disabled={isAdmin || loading} className={`bg-sky-400 hover:bg-sky-500 text-white py-2 px-12 rounded-lg text-sm ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : ''}`}>
              {loading ? 'Mengirim...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default LokerForm
