import React from 'react'
import img from '../assets/img/sertifikasi.png'
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
          <div className="modal-box">
            <form method="dialog">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Tambah Sertifikasi</h3>
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

            <div className="modal-action flex justify-end">
              <button className="btn bg-sky-400 text-white rounded-full px-10">Simpan</button>
            </div>
          </div>
        </dialog>
      </div>

      <div className="mt-5 space-y-4">
        {[
          {
            title: 'Sertifikasi SMAW 3G Plate',
            bidang: 'Welder',
            keahlian: 'Plate',
            tanggal: '12 Januari 2025',
            waktu: '08:00 - 10:00 WIB',
            lokasi: 'Jakarta',
            metode: 'Online',
          },
          {
            title: 'Sertifikasi TIG 6G Pipe',
            bidang: 'Welder',
            keahlian: 'Pipe',
            tanggal: '28 Februari 2025',
            waktu: '10:00 - 12:00 WIB',
            lokasi: 'Surabaya',
            metode: 'Offline',
          },
          {
            title: 'Sertifikasi MIG 2G Structural',
            bidang: 'Welder',
            keahlian: 'Structural',
            tanggal: '15 Maret 2025',
            waktu: '13:00 - 15:00 WIB',
            lokasi: 'Bandung',
            metode: 'Online',
          },
          {
            title: 'Sertifikasi Welding Inspector Level 1',
            bidang: 'Inspector',
            keahlian: 'Inspector',
            tanggal: '22 Maret 2025',
            waktu: '09:00 - 11:00 WIB',
            lokasi: 'Jakarta',
            metode: 'Offline',
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
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
              <button className="btn btn-outline outline-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white rounded-full px-10" onClick={() => document.getElementById(`detailModal-${index}`).showModal()}>
                Lihat Detail
              </button>
            </div>

            {/* Detail Modal */}
            <dialog id={`detailModal-${index}`} className="modal">
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
                  <button className="btn text-gray-400" type="button" onClick={() => document.getElementById(`editModal-${index}`).showModal()}>
                    Edit
                  </button>
                  <button className="btn text-[#86CEEB]" onClick={() => navigate('/pelamar-sertifikasi')}>
                    Daftar Pelamar
                  </button>
                </div>
              </div>
            </dialog>

            {/* Edit Modal */}
            <dialog id={`editModal-${index}`} className="modal">
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
