import { useState } from 'react'
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaEye, FaEllipsisVertical, FaPenToSquare, FaShareNodes, FaTrash } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import badgeAdmin from '../assets/img/badgeAdmin.png'

const Postingan = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const [postData, setPostData] = useState([
    {
      id: 1,
      name: 'UNEDO',
      username: 'unedo',
      timeUpload: '40 menit',
      isLiked: false,
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      username: 'ipsumdolor',
      timeUpload: '50 menit',
      isLiked: false,
    },
  ])

  const toogleConnect = (id) => {
    setPostData((prev) => prev.map((post) => (post.id === id ? { ...post, isLiked: !post.isLiked } : post)))
  }

  return (
    <div className="">
      {postData.slice(0, 10).map((post) => (
        <div key={post.id} className="flex flex-col gap-0 bg-white rounded-2xl font-sans my-2">
          <div className="flex flex-col gap-3 border border-gray-300 rounded-t-xl p-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-3 items-center">
                <div className="bg-blue-700 w-9 h-9 rounded-full"></div>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold text-base">{post.name}</p>
                    <img src={badgeAdmin} alt="Badge Admin" />
                    {/* <p className="text-base">(Anda)</p> */}
                  </div>
                  <p className="text-sm">@{post.username}</p>
                </div>
              </div>

              <div className="flex flex-row gap-4 items-start">
                <p className="text-sm text-gray-500">{post.timeUpload} yang lalu</p>
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
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin vitae erat nec nisl interdum tristique. Suspendisse potenti. Sed non metus nec sapien sodales varius.</p>
              <div className="max-w-3xl w-full rounded-lg h-60 bg-gray-400"></div>
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
                <p className="text-sm">Dilihat 21 Orang</p>
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Postingan
