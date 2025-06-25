import { useEffect, useState, useRef } from 'react'
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaEye, FaEllipsisVertical, FaPenToSquare, FaShareNodes, FaTrash } from 'react-icons/fa6'
import { FaUserCircle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import badgeAdmin from '../assets/img/badgeAdmin.png'
import { fetchAllPostingan } from '../api/posting'
import { fetchUserById } from '../api/user'
import InfiniteScroll from 'react-infinite-scroll-component'

const Postingan = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [postData, setPostData] = useState([])
  const [userMap, setUserMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const isRefreshing = useRef(false)
  const sudahPernahLoad = useRef(false)

  const fetchData = async (currentPage = 1, append = false) => {
    if (!append && !sudahPernahLoad.current) setLoading(true)
    try {
      const res = await fetchAllPostingan(currentPage) // res = response.data
      const data = res.data || []
      setHasMore(!!res.next_page_url)

      setPostData((prev) => (append ? [...prev, ...data] : isRefreshing.current && prev.length > data.length ? prev : data))

      // Fetch user data for new user_ids
      const userIds = [...new Set(data.map((post) => post.user_id))]
      const unknownIds = userIds.filter((id) => !userMap[id])
      if (unknownIds.length > 0) {
        const userPromises = unknownIds.map((id) => fetchUserById(id))
        const users = await Promise.all(userPromises)
        const userMapping = {}
        unknownIds.forEach((id, i) => {
          userMapping[id] = users[i]
        })
        setUserMap((prev) => ({ ...prev, ...userMapping }))
      }
    } catch (error) {
      if (!append) setPostData([])
      setHasMore(false)
      console.error('Gagal fetch postingan:', error)
    } finally {
      setLoading(false)
      sudahPernahLoad.current = true
      isRefreshing.current = false
    }
  }

  // Initial load & background refresh
  useEffect(() => {
    fetchData(1, false)
    setPage(1)
    const interval = setInterval(() => {
      isRefreshing.current = true
      fetchData(1, false)
    }, 10000)
    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  // Fetch next page saat scroll bawah
  const fetchMoreData = async () => {
    const nextPage = page + 1
    await fetchData(nextPage, true)
    setPage(nextPage)
  }

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const toogleConnect = (id) => {
    setPostData((prev) => prev.map((post) => (post.id === id ? { ...post, isLiked: !post.isLiked } : post)))
  }

  if (loading && page === 1) return <div className="p-10 text-center min-h-screen">Memuat postingan...</div>

  return (
    <InfiniteScroll dataLength={postData.length} next={fetchMoreData} hasMore={hasMore} loader={<h4 className="text-center py-3">Memuat...</h4>} endMessage={<p className="text-center text-gray-400 py-3">Tidak ada postingan lagi.</p>}>
      {postData.map((post) => {
        const user = userMap[post.user_id]?.data || userMap[post.user_id]
        return (
          <div key={post.id} className="flex flex-col gap-0 bg-white rounded-2xl font-sans my-2">
            <div className="flex flex-col gap-3 border border-gray-300 rounded-t-xl p-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center">
                  {user && user.fotoProfil ? <img src={user.fotoProfil} alt="Foto Profil" className="w-12 h-12 rounded-full shrink-0 object-cover" /> : <FaUserCircle className="text-4xl text-blue-600" />}
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-1 items-center">
                      <p className="font-semibold text-base">{user ? user.nama : 'User Tidak Diketahui'}</p>
                      {user && user.role === 'admin' && <img src={badgeAdmin} alt="Badge Admin" />}
                    </div>
                    <p className="text-sm">@{user ? user.username : '-'}</p>
                  </div>
                </div>

                <div className="flex flex-row gap-4 items-start">
                  <p className="text-sm text-gray-500">{post.created_at ? new Date(post.created_at).toLocaleString('id-ID') : '-'}</p>
                  <div className="relative">
                    <div onClick={toggleDropDown} className="flex cursor-pointer select-none mt-1">
                      <FaEllipsisVertical />
                    </div>
                    {dropDownOpen && (
                      <div className="absolute right-0 mt-2 w-38 bg-white rounded-xl shadow-xl border-gray-500">
                        <ul className="p-2">
                          <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                            <FaPenToSquare />
                            <span>Edit</span>
                          </NavLink>
                          <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                            <FaShareNodes />
                            <span>Bagikan</span>
                          </NavLink>
                          <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                            <FaTrash />
                            <span>Hapus</span>
                          </NavLink>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* isi postingan */}
              <div className="flex flex-col gap-2">
                <p className="text-sm">{post.description}</p>
                {post.attachment_image && <img src={`${import.meta.env.VITE_BASE_URL}/storage/${post.attachment_image}`} className="max-w-3xl w-full rounded-lg h-60 object-cover" alt="attachment" />}
              </div>
            </div>

            <div className="flex flex-row flex-wrap justify-between border border-gray-300 border-t-0 rounded-b-xl px-4 py-2">
              <div className="flex flex-row gap-2">
                <button type="button" onClick={() => toogleConnect(post.id)} className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-100">
                  {post.isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  <p className="text-sm">Menyukai</p>
                </button>
                <a href="#komentar-postingan">
                  <button className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-100">
                    <FaRegComment />
                    <p className="text-sm">Komentar</p>
                  </button>
                </a>
                <a href="#kirim-postingan">
                  <button className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-100">
                    <FaRegPaperPlane />
                    <p className="text-sm">Kirim</p>
                  </button>
                </a>
              </div>
              <a href="#tambah-postingan">
                <button className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-100">
                  <FaEye />
                  <p className="text-sm">Dilihat {post.view_count || 0} Orang</p>
                </button>
              </a>
            </div>
          </div>
        )
      })}
    </InfiniteScroll>
  )
}

export default Postingan
