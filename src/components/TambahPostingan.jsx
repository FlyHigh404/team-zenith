import { useState, useRef } from 'react'
import { FaTrash, FaImages, FaFileLines, FaLink } from 'react-icons/fa6'
import { FaUserCircle } from 'react-icons/fa'
import { createPostingan } from '../api/posting'

const TambahPostingan = ({ onSuccess }) => {
  const textareaRef = useRef(null)

  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [docFile, setDocFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setSelectedImage(null)
  }

  const handleDocChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDocFile(file)
      setSelectedDoc(file.name)
    }
  }

  const removeDoc = () => {
    setDocFile(null)
    setSelectedDoc(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!description.trim() && !imageFile && !docFile) {
      setError('Isi postingan, gambar, atau dokumen diperlukan!')
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('description', description)
      if (imageFile) formData.append('attachment_image', imageFile)
      if (docFile) formData.append('attachment_file', docFile)

      await createPostingan(formData)
      setDescription('')
      removeImage()
      removeDoc()
      if (onSuccess) onSuccess()
    } catch (error) {
      setError('Gagal mengunggah postingan!')
      console.error('Error creating posting:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="bg-white p-4 rounded-t-2xl border border-gray-300 font-sans" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-3">
        <FaUserCircle className="text-4xl text-blue-600" />
        <textarea ref={textareaRef} value={description} onChange={(e) => setDescription(e.target.value)} onInput={handleInput} placeholder="Apa yang sedang kamu pikirkan?" className="w-full outline-none resize-none text-sm max-h-[300px]" />
      </div>

      {/* Preview gambar */}
      {selectedImage && (
        <div className="relative my-4">
          <img src={selectedImage} alt="Preview" className="rounded-xl w-full h-auto max-h-60 object-cover" />
          <button type="button" onClick={removeImage} className="btn btn-sm btn-circle absolute top-2 right-2 bg-gray-500/40 hover:bg-gray-500 text-white border-none shadow-none">
            <FaTrash />
          </button>
        </div>
      )}

      {/* Preview dokumen */}
      {selectedDoc && (
        <div className="flex items-center gap-2 my-2">
          <FaFileLines className="text-gray-500" />
          <span className="text-xs">{selectedDoc}</span>
          <button type="button" onClick={removeDoc} className="btn btn-xs bg-red-400 hover:bg-red-500 text-white ml-2 rounded">
            <FaTrash />
          </button>
        </div>
      )}

      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

      <div className="flex flex-row items-center justify-between mt-3">
        <div className="flex flex-row gap-2 items-center">
          <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
            <label htmlFor="uploadGambar" className="flex items-center gap-2 cursor-pointer">
              <FaImages />
              <p className="hidden md:block">Gambar</p>
            </label>
            <input id="uploadGambar" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
            <label htmlFor="uploadFile" className="flex items-center gap-2 cursor-pointer">
              <FaFileLines />
              <p className="text-sm hidden md:block">Dokumen</p>
            </label>
            <input id="uploadFile" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" className="hidden" onChange={handleDocChange} />
          </div>
        </div>
        <button type="submit" className="bg-[#86CEEB] hover:bg-sky-500 px-4 py-2 rounded-xl text-white text-sm font-semibold" disabled={loading}>
          {loading ? 'Mengunggah...' : 'Unggah'}
        </button>
      </div>
    </form>
  )
}

export default TambahPostingan
