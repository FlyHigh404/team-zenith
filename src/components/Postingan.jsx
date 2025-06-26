import { useEffect, useState, useRef } from 'react'
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaEye, FaEllipsisVertical, FaPenToSquare, FaShareNodes, FaTrash, FaImages } from 'react-icons/fa6'
import { FaUserCircle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import badgeAdmin from '../assets/img/badgeAdmin.png'
import { fetchAllPostingan, deletePostingan, likePostingan, unlikePostingan, updatePostingan } from '../api/posting'
import { fetchUserById } from '../api/user'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getUserData } from '../utils/token'

const Postingan = () => {
  const [dropDownOpen, setDropDownOpen] = useState(null)
  const [postData, setPostData] = useState([])
  const [userMap, setUserMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const isRefreshing = useRef(false)
  const sudahPernahLoad = useRef(false)
  const userLogin = getUserData()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editPost, setEditPost] = useState(null)
  const [editForm, setEditForm] = useState({ description: '', attachment_image: null })
  const [editPreview, setEditPreview] = useState(null)

  // --- Fetch Data
  const fetchData = async (currentPage = 1, append = false) => {
    if (!append && !sudahPernahLoad.current) setLoading(true)
    try {
      const res = await fetchAllPostingan(currentPage)
      const data = res.data || []
      setHasMore(!!res.next_page_url)

      setPostData((prev) => (append ? [...prev, ...data] : isRefreshing.current && prev.length > data.length ? prev : data))

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

  // --- Initial load & background refresh
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

  const fetchMoreData = async () => {
    const nextPage = page + 1
    await fetchData(nextPage, true)
    setPage(nextPage)
  }

  const toggleDropDown = (id) => {
    setDropDownOpen((prev) => (prev === id ? null : id))
  }

  const openEditModal = (post) => {
    setEditPost(post)
    setEditForm({ description: post.description, attachment_image: null })
    setEditPreview(post.attachment_image ? `${import.meta.env.VITE_BASE_URL}/storage/${post.attachment_image}` : null)
    setEditModalOpen(true)
  }

  const handleEditChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'attachment_image' && files[0]) {
      setEditForm((prev) => ({ ...prev, attachment_image: files[0] }))
      setEditPreview(URL.createObjectURL(files[0]))
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editPost) return
    try {
      const formData = new FormData()
      formData.append('description', editForm.description)
      if (editForm.attachment_image) {
        formData.append('attachment_image', editForm.attachment_image)
      }
      await updatePostingan(editPost.id, formData)
      setEditModalOpen(false)
      setEditPost(null)
      setEditForm({ description: '', attachment_image: null })
      setEditPreview(null)
      fetchData(1, false)
    } catch (error) {
      alert('Gagal mengupdate postingan!')
      console.error('Gagal mengupdate postingan:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus postingan ini?')) return
    try {
      await deletePostingan(id)
      fetchData(1, false)
      setDropDownOpen(null)
    } catch (error) {
      alert('Gagal menghapus postingan!')
      console.error(error)
    }
  }

  const handleLikeToggle = async (post) => {
    try {
      if (post.likes.some((like) => like.user_id === userLogin?.id)) {
        await unlikePostingan(post.id)
        setPostData((prev) => prev.map((p) => (p.id === post.id ? { ...p, likes: p.likes.filter((l) => l.user_id !== userLogin.id) } : p)))
      } else {
        await likePostingan(post.id)
        setPostData((prev) => prev.map((p) => (p.id === post.id ? { ...p, likes: [...p.likes, { user_id: userLogin.id }] } : p)))
      }
    } catch (error) {
      alert('Gagal mengubah like!')
      console.error(error)
    }
  }

  if (loading && page === 1) return <div className="p-10 text-center min-h-screen">Memuat postingan...</div>

  return (
    <>
      <InfiniteScroll dataLength={postData.length} next={fetchMoreData} hasMore={hasMore} loader={<h4 className="text-center py-3">Memuat...</h4>} endMessage={<p className="text-center text-gray-400 py-3">Tidak ada postingan lagi.</p>}>
        {postData.map((post) => {
          const user = userMap[post.user_id]?.data || userMap[post.user_id]
          const isLiked = post.likes.some((like) => like.user_id === userLogin?.id)
          const likeCount = post.likes.length
          return (
            <div key={post.id} className="flex flex-col gap-0 bg-white rounded-2xl font-sans my-2">
              <div className="flex flex-col gap-3 border border-gray-300 rounded-t-xl p-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-3 items-center">
                    {user && user.fotoProfil ? (
                      <img src={`http://34.132.16.206/storage/profiles/${user.fotoProfil}`} alt="Foto Profil" className="w-12 h-12 rounded-full shrink-0 object-cover" />
                    ) : (
                      <FaUserCircle className="text-4xl text-blue-600" />
                    )}
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-1 items-center">
                        <p className="font-semibold text-base">{user ? user.nama : 'User Tidak Diketahui'}</p>
                        {user && user.role === 'admin' && <img src={badgeAdmin} alt="Badge Admin" />}
                      </div>
                      <p className="text-sm">@{user ? user.username : '-'}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 items-start">
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at)
                        .toLocaleString('id-ID', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                        .replace(':', '.')}
                      <span> {post.created_at !== post.updated_at ? '(Edited)' : ''}</span>
                    </p>
                    {userLogin && userLogin.id === post.user_id && (
                      <div className="relative">
                        <div onClick={() => toggleDropDown(post.id)} className="flex cursor-pointer select-none mt-1">
                          <FaEllipsisVertical />
                        </div>
                        {dropDownOpen === post.id && (
                          <div className="absolute right-0 mt-2 w-38 bg-white rounded-xl shadow-xl border-gray-500">
                            <ul className="p-2">
                              <NavLink
                                to="#"
                                className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm"
                                onClick={() => {
                                  setDropDownOpen(null)
                                  openEditModal(post)
                                }}
                              >
                                <FaPenToSquare />
                                <span>Edit</span>
                              </NavLink>
                              <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm">
                                <FaShareNodes />
                                <span>Bagikan</span>
                              </NavLink>
                              <NavLink to="#" className="flex hover:bg-gray-100 p-3 items-center gap-2 rounded-lg text-sm" onClick={() => handleDelete(post.id)}>
                                <FaTrash />
                                <span>Hapus</span>
                              </NavLink>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* isi postingan */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm" style={{ whiteSpace: 'pre-line' }}>
                    {post.description}
                  </div>
                  {post.attachment_image && <img src={`http://34.132.16.206/storage/${post.attachment_image}`} className="max-w-3xl w-full rounded-lg h-60 object-cover" alt="attachment" />}
                </div>
              </div>

              <div className="flex flex-row flex-wrap justify-between border border-gray-300 border-t-0 rounded-b-xl px-4 py-2">
                <div className="flex flex-row gap-2">
                  <button type="button" onClick={() => handleLikeToggle(post)} className="flex flex-row gap-1.5 items-center p-2 bg-white dark:bg-[#659BB0] rounded-md hover:bg-gray-100">
                    {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                    <p className="text-sm">{isLiked ? 'Disukai' : 'Menyukai'}</p>
                    <span className="text-xs ml-1 text-gray-600">{likeCount}</span>
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
      {/* Modal Edit */}
      {editModalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative border-2 border-sky-500">
            <button className="absolute top-3 right-4 text-2xl" onClick={() => setEditModalOpen(false)}>
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-3">Edit Postingan</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea name="description" className="input input-bordered w-full" value={editForm.description} onChange={handleEditChange} rows={5} required />
              </div>
              <div>
                <label htmlFor="uploadGambar" className="flex items-center gap-2 cursor-pointer">
                  <FaImages />
                  <p className="hidden md:block">Gambar (opsional)</p>
                </label>
                <input type="file" name="attachment_image" accept="image/*" onChange={handleEditChange} />
                {editPreview && <img src={editPreview} alt="Preview" className="w-28 h-28 object-cover mt-2 rounded" />}
              </div>
              <button type="submit" className="btn bg-sky-500 text-white rounded-full px-8">
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Postingan
