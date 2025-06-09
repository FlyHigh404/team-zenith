import React, { useState, useRef } from "react";
import { FaTrash, FaImages, FaFileLines, FaLink } from "react-icons/fa6";

const TambahPostingan = () => {
    const textareaRef = useRef(null)

    const handleInput = () => {
        const textarea = textareaRef.current
        if (textarea) {
        textarea.style.height = "auto"
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
        setSelectedImage(null)
    }

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-300 font-sans">
            <div className="flex flex-row gap-3">
                <div className="bg-blue-700 w-9 h-9 rounded-full shrink-0"></div>
                <textarea
                    ref={textareaRef}
                    onInput={handleInput}
                    placeholder="Apa yang sedang kamu pikirkan?"
                    className="w-full outline-none resize-none text-sm max-h-[300px]"
                />
            </div>

            {/* Preview gambar */}
            {selectedImage && (
                <div className="relative my-4">
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="rounded-xl w-full h-auto max-h-60 object-cover"
                    />
                    <button
                        onClick={removeImage}
                        className="btn btn-sm btn-circle absolute top-2 right-2 bg-gray-500/40 hover:bg-gray-500 text-white border-none shadow-none"
                    >
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

            <div className="flex flex-row items-center justify-between mt-3">
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex px-2 h-8 items-center gap-2 rounded-md cursor-pointer hover:bg-gray-100">
                        <label htmlFor="uploadGambar" className="flex items-center gap-2 cursor-pointer">
                            <FaImages />
                            <p>Gambar</p>
                        </label>
                        <input
                            id="uploadGambar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
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
    )
}

export default TambahPostingan