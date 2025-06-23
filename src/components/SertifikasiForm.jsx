import { useState } from 'react'
import { applySertifikasi } from '../api/forum'
import { getUserData } from '../utils/token'

const SertifikasiForm = ({ selected }) => {
  const user = getUserData()
  const [loading, setLoading] = useState(false)
  const [sukses, setSukses] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSukses(null)
    setError(null)
    try {
      await applySertifikasi(selected.id)
      setSukses('Pendaftaran berhasil!')
    } catch (error) {
      setError('Gagal mendaftar sertifikasi. Sudah pernah daftar atau ada kendala lain.')
      console.error('Error applying for certification:', error)
    }
    setLoading(false)
  }

  return (
    <div className="w-2/3 bg-white p-4 rounded-lg mt-10 shadow-md">
      <h1 className="text-xl font-bold mb-4">Daftar Sertifikasi</h1>
      <form className="mt-5 md:mt-10 lg:mt-5" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="mb-4 md:mb-7 lg:mb-4 w-full">
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <p className="border border-gray-300 rounded-lg block w-full p-2.5">{user?.nama || '-'}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <p className="border border-gray-300 rounded-lg block w-full p-2.5">{user?.notelp || '-'}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-1">Email</label>
            <p className="border border-gray-300 rounded-lg block w-full p-2.5">{user?.email || '-'}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-[50%]">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Kota</label>
              <p className="border border-gray-300 rounded-lg block w-full p-2.5">{user?.kota || '-'}</p>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Provinsi</label>
              <p className="border border-gray-300 rounded-lg block w-full p-2.5">{user?.provinsi || '-'}</p>
            </div>
          </div>
        </div>

        {error && <div className="text-red-600 mb-3">{error}</div>}
        {sukses && <div className="text-green-600 mb-3">{sukses}</div>}

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="bg-gray-300 text-gray-700 px-14 py-2 rounded-md hover:bg-gray-400 text-sm" onClick={() => window.history.back()}>
            Batal
          </button>
          <button type="submit" className={`bg-sky-400 hover:bg-sky-500 text-white py-2 px-16 rounded-lg text-sm ${loading ? 'opacity-60' : ''}`} disabled={loading}>
            {loading ? 'Mendaftar...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SertifikasiForm
