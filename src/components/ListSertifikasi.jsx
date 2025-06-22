import React from 'react'
import img from '../assets/img/sertifikasi.png'
import dataSertifikasi from '../data/sertifikasi'
import { FaRegBookmark, FaClock, FaToolbox, FaCalendar, FaShare, FaLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const ListSertifikasi = () => {
  const openTambahModal = () => {
    document.getElementById('tambahModal').showModal()
  }

  const navigate = useNavigate()

  return (
    <div className="mt-10 mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#333B69] text-xl font-semibold">Sertifikasi Saat Ini</h1>
        <button onClick={openTambahModal} className="btn bg-sky-400 hover:bg-sky-500 text-white font-light rounded-xl px-8">
          + Tambah
        </button>

        <dialog id="tambahModal" className="modal">
          <div className="modal-box h-135">
            <form method="dialog">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Tambah Sertifikasi</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
              </div>
            </form>
            <hr className="my-3 text-gray-200" />

            <div className="my-2 space-y-2">
              {[
                { label: 'Nama Sertifikasi', name: 'nama_sertifikasi' },
                { label: 'Bidang Sertifikasi', name: 'bidang_sertifikasi' },
                { label: 'Keahlian', name: 'keahlian' },
                { label: 'Tanggal Pelaksanaan', name: 'tanggal_pelaksanaan', type: 'date' },
                { label: 'Waktu Pelaksanaan', name: 'waktu_pelaksanaan', type: 'time' },
                { label: 'Lokasi Pelaksanaan', name: 'lokasi_pelaksanaan' },
                { label: 'Status Pelaksanaan', name: 'status_pelaksanaan' },
                { label: 'Deskripsi Sertifikasi', name: 'deskripsi', type: 'textarea' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="font-medium text-md">{field.label}</label>

                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      className="textarea textarea-bordered w-full mt-1.5"
                      placeholder={field.label}
                    ></textarea>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      className="input input-bordered w-full mt-1.5"
                      placeholder={field.label}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="modal-action flex justify-end">
              <button className="btn bg-sky-400 text-white rounded-full px-10">Simpan</button>
            </div>
          </div>
        </dialog>
      </div>

      <div className="mt-5 space-y-4">
        {dataSertifikasi.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
            <div className="p-2">
              <img src={img} alt="" />
            </div>

            <div className="flex flex-col w-[200px]">
              <p className="font-medium text-base truncate">{item.title}</p>
              <p className="text-sm text-sky-400">Materi Sertifikasi</p>
            </div>

            <div className="flex flex-col w-[100px]">
              <p className="font-medium text-base">{item.bidang}</p>
              <p className="text-sm text-sky-400">Bidang</p>
            </div>

            <div className="flex flex-col w-[100px]">
              <p className="font-medium text-base">{item.keahlian}</p>
              <p className="text-sm text-sky-400">Keahlian</p>
            </div>

            <div className="flex flex-col w-[150px]">
              <p className="font-medium text-base">{item.tanggal}</p>
              <p className="text-sm text-sky-400">Tanggal Pelaksanaan</p>
            </div>

            <div className="p-2">
              <button className="btn btn-outline outline-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-full px-10" onClick={() => document.getElementById(`detailModal-${item.id}`).showModal()}>
                Lihat Detail
              </button>
            </div>

            {/* Detail Modal */}
            <dialog id={`detailModal-${item.id}`} className="modal">
              <div className="modal-box w-9/12 max-w-2xl">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <img src={img} className="w-15" />
                    <div className="py-1">
                      <p className="font-semibold text-xl truncate">{item.title}</p>
                      <p className="text-md">
                        {item.bidang}, {item.keahlian}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-gray-400 py-1">
                    <FaRegBookmark className="text-xl" />
                    <FaShare className="text-xl" />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between my-2">
                    <div className="flex">
                      <FaCalendar className="text-gray-400 text-2xl" />
                      <p className="ml-2 text-black text-md pt-0.5">{item.tanggal}</p>
                    </div>
                    <div className="flex">
                      <FaClock className="text-gray-400 text-2xl" />
                      <p className="ml-2 text-black text-md pt-0.5">{item.waktu}</p>
                    </div>
                    <div className="flex">
                      <FaLocationDot className="text-gray-400 text-2xl" />
                      <p className="ml-2 text-black text-md pt-0.5">{item.lokasi}</p>
                    </div>
                    <div className="flex">
                      <FaToolbox className="text-gray-400 text-2xl" />
                      <p className="ml-2 text-black text-md pt-0.5">{item.metode}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-action flex justify-between">
                  <button className="btn text-gray-400" type="button" onClick={() => document.getElementById(`editModal-${item.id}`).showModal()}>
                    Edit
                  </button>
                  <button className="btn text-[#86CEEB]" onClick={() => navigate('/pelamar-sertifikasi')}>
                    Daftar Pelamar
                  </button>
                </div>
              </div>
            </dialog>

            {/* Edit Modal */}
            <dialog id={`editModal-${item.id}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">Edit Sertifikasi</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5 text-xl">✕</button>
                  </div>
                </form>
                <hr className="my-3 text-gray-200" />
                <div className="my-2 space-y-2">
                  {['Nama Sertifikasi', 'Bidang Sertifikasi', 'Keahlian', 'Tanggal Pelaksanaan', 'Waktu Pelaksanaan', 'Lokasi Pelaksanaan', 'Status Pelaksanaan', 'Deskripsi Sertifikasi'].map((label, i) => (
                    <div key={i}>
                      <label className="font-medium text-md">{label}</label>
                      <input className="input input-bordered w-full mt-1.5" placeholder={label} />
                    </div>
                  ))}
                </div>
                <div className="modal-action flex justify-between">
                  <button className="btn bg-red-500 text-white rounded-full px-10">Hapus</button>
                  <button className="btn bg-sky-400 text-white rounded-full px-10">Simpan Perubahan</button>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSertifikasi
