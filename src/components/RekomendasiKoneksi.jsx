import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { activeUserList, ajukanKoneksi, listKoneksi } from '../api/beranda'
import { FaRegSquarePlus, FaRegSquareCheck } from 'react-icons/fa6'
import { FaUserCircle } from 'react-icons/fa'
import { getUserData } from '../utils/token'

const RekomendasiKoneksi = () => {
  const [allUser, setAllUser] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [koneksiData, setKoneksiData] = useState([])

  const userData = getUserData()
  const myUserId = userData?.id

  useEffect(() => {
    const fetchKoneksi = async () => {
      try {
        const res = await listKoneksi()
        setKoneksiData(res.data || [])
      } catch (error) {
        console.error('Gagal mengambil daftar koneksi:', error)
        setKoneksiData([])
      }
    }
    fetchKoneksi()
  }, [])

  useEffect(() => {
    fetchUser(1)
  }, [])

  const fetchUser = async (page) => {
    setLoading(true)
    try {
      const res = await activeUserList(page)
      const userArr = (res.data?.data || []).map((u) => ({
        ...u,
        isConnect: false,
      }))
      setAllUser((prev) => {
        const ids = new Set(prev.map((u) => u.id))
        return [...prev, ...userArr.filter((u) => !ids.has(u.id))]
      })
      setNextUrl(res.data?.next_page_url)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (!nextUrl) return
    const url = new URL(nextUrl)
    const page = url.searchParams.get('page')
    fetchUser(page)
  }

  const toogleConnect = async (id) => {
    try {
      await ajukanKoneksi(id)
      const res = await listKoneksi()
      setKoneksiData(res.data || [])
    } catch (error) {
      console.error('Gagal mengajukan koneksi:', error)
    }
  }
  return (
    <div className="flex flex-col gap-0 font-sans pb-5">
      <div className="flex flex-col border-gray-300 border rounded-t-xl bg-white px-4 py-3 gap-4">
        <h2 className="font-semibold text-base">Orang yang Mungkin Anda Kenal</h2>
      </div>

      <div className="flex flex-col border-gray-300 border border-t-0 bg-white px-4 py-3 gap-3">
        {allUser.map((user) => {
          const isConnectedOrRequested = koneksiData.some(
            (conn) => (conn.status === 'diajukan' || conn.status === 'diterima') && ((conn.user_id === myUserId && conn.koneksi_user_id === user.id) || (conn.user_id === user.id && conn.koneksi_user_id === myUserId))
          )
          return (
            <div key={user.id} className="flex flex-row items-center justify-between gap-4 w-full">
              <NavLink to="#profil-user" className="flex flex-row gap-3 items-start">
                {user.fotoProfil ? <img src={user.fotoProfil} alt="Foto Profil" className="w-8 h-8 rounded-full shrink-0 object-cover" /> : <FaUserCircle className="w-8 h-8 text-blue-600 shrink-0" />}
                <div className="overflow-hidden">
                  <p className="font-semibold text-sm">{user.nama}</p>
                  <p className="text-xs line-clamp-2">
                    {user.pekerjaan && user.pekerjaan.length > 0 ? user.pekerjaan.join(', ') : '-'}
                    <br />
                    <span className="italic text-gray-400">{user.username}</span>
                    {user.levelProfesional && user.levelProfesional.length > 0 && <span> • Level: {user.levelProfesional.join(', ')}</span>}
                  </p>
                </div>
              </NavLink>
              {isConnectedOrRequested ? (
                <FaRegSquareCheck className="text-[#659BB0] text-lg" title="Sudah atau sedang diajukan" />
              ) : (
                <button type="button" onClick={() => toogleConnect(user.id)} className="text-lg">
                  <FaRegSquarePlus />
                </button>
              )}
            </div>
          )
        })}

        {nextUrl && (
          <button className="mt-4 px-4 py-2 rounded-lg bg-[#86CEEB] text-white font-semibold hover:bg-sky-500" onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Memuat...' : 'Lihat Lebih Banyak'}
          </button>
        )}
      </div>
    </div>
  )
}

export default RekomendasiKoneksi
