import { useState, useRef } from 'react'
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaEye, FaEllipsisVertical, FaPlus, FaPenToSquare, FaShareNodes, FaTrash, FaImages, FaFileLines, FaLink } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import badgeAdmin from '../assets/img/badgeAdmin.png'

const PostinganAdmin = () => {
  const toogleConnect = (id) => {
    setPostData((prev) => prev.map((post) => (post.id === id ? { ...post, isLiked: !post.isLiked } : post)))
  }

  const [dropDownOpen, setDropDownOpen] = useState(false)

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen)
  }

  const openModalPostingan = () => {
    document.getElementById('modalPostingan').showModal()
  }

  const textareaRef = useRef(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const [selectedImage, setSelectedImage] = useState()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const removeImage = () => {
    setSelectedImage()
  }

  const [postData, setPostData] = useState([
    {
      id: 1,
      name: 'UNEDO',
      username: 'unedo',
      timeUpload: '40 menit',
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      username: 'ipsum dolor',
      timeUpload: '50 menit',
    },
  ])

  // const [selectedFile, setSelectedFile] = useState()

  // const handleFileChange = (e) => {
  //     const file = e.target.files[0]
  //     if (file) {
  //     setSelectedFile(file)
  //     }
  // }

  // const removeFile = () => {
  //     setSelectedFile()
  // }

  return (
    <div className="flex flex-col border-gray-300 border rounded-2xl bg-white p-4 gap-3 font-sans">
      <div className="flex flex-row gap-3">
        <div className="hidden lg:flex space-x-4">
          <a href="#postingan-admin">
            <button className="px-6 py-2 text-base font-semibold bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-xl hover:bg-sky-500 cursor-pointer">Postingan</button>
          </a>
        </div>
        {/* <div className="hidden lg:flex space-x-4">
                    <a href="#pengalaman-admin">
                        <button className="px-6 py-2 text-base font-normal bg-white dark:bg-[#659BB0] text-gray-700 rounded-xl hover:bg-gray-200 border border-gray-700 cursor-pointer">Pengalaman</button>
                    </a>
                </div>
                <div className="hidden lg:flex space-x-4">
                    <a href="#sertifikat-admin">
                        <button className="px-6 py-2 text-base font-normal bg-white dark:bg-[#659BB0] text-gray-700 rounded-xl hover:bg-gray-200 border border-gray-700 cursor-pointer">Sertifikat</button>
                    </a>
                </div> */}
      </div>

      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="font-semibold text-base">Semua Postingan</h2>
        <button onClick={openModalPostingan} className="flex flex-row gap-2 items-center px-4 py-2 text-base  bg-[#86CEEB] dark:bg-[#659BB0] text-white rounded-xl hover:bg-sky-500">
          <FaPlus />
          <p className="text-sm font-semibold text-white">Tambah</p>
        </button>

        <dialog id="modalPostingan" className="modal">
          <div className="modal-box rounded-xl shadow-lg p-4">
            <form method="dialog">
              <div className="flex flex-row">
                <div className="flex flex-row gap-3">
                  <div className="bg-blue-700 w-8 h-8 rounded-full"></div>
                  <div className="flex flex-row gap-1 items-center">
                    <p className="font-semibold text-base">UNEDO</p>
                    <img src={badgeAdmin} alt="Badge Admin" />
                    {/* <p className="text-base">(Anda)</p> */}
                  </div>
                </div>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
              </div>
            </form>

            <textarea ref={textareaRef} onInput={handleInput} placeholder="Apa yang sedang kamu pikirkan?" className="w-full outline-none resize-none mt-4 text-sm min-h-[80px] max-h-[300px]" />

            {/* Preview gambar */}
            {selectedImage && (
              <div className="relative my-4">
                <img src={selectedImage} alt="Preview" className="rounded-xl w-full h-auto max-h-60 object-cover" />
                <button onClick={removeImage} className="btn btn-sm btn-circle absolute top-2 right-2 bg-gray-500/40 hover:bg-gray-500 text-white border-none shadow-none">
                  <FaTrash />
                </button>
              </div>
            )}

            {/* Preview file */}
            {/* {selectedFile && (
                            <div className="relative mt-4">
                            <img
                                src={selectedFile}
                                alt="Preview"
                                className="w-full h-auto rounded-md object-cover"
                            />
                            <button
                                onClick={handleRemoveFile}
                                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                            >
                                <FaTrash />
                            </button>
                            </div>
                        )} */}

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
                  <label htmlFor="uploadGambar" className="flex items-center gap-2 cursor-pointer">
                    <FaImages />
                    <p>Gambar</p>
                  </label>
                  <input id="uploadGambar" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>

                <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
                  <label htmlFor="uploadFile" className="flex items-center gap-2 cursor-pointer">
                    <FaFileLines />
                    <p className="text-sm">Dokumen</p>
                  </label>
                  {/* <input 
                                        id="uploadFile"
                                        type="file"
                                        accept="file/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    /> */}
                </div>
                <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
                  <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <FaLink />
                    <p className="text-sm">Link</p>
                  </label>
                </div>
              </div>
              <button className="bg-[#86CEEB] hover:bg-sky-500 px-4 py-2 rounded-xl text-white text-sm font-semibold">Unggah</button>
            </div>
          </div>
        </dialog>
      </div>

      {/* card postingan */}
      {postData.slice(0, 10).map((post) => (
        <div key={post.id} className="flex flex-col gap-0">
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

export default PostinganAdmin
