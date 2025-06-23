import React from 'react'
import { FaXmark } from 'react-icons/fa6'
import { FaUserCircle, FaTelegramPlane, FaSearch } from 'react-icons/fa'
import koneksiData from '../data/koneksiData'

const ListKoneksi = () => {
  return (
    <div className="border-gray-300 w-full border rounded-2xl bg-white p-4 flex-1 px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold mb-6">1 Koneksi</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari Koneksi"
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        </div>
      </div>

      <div className="space-y-3">
        {koneksiData.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada permintaan koneksi.</p>
        ) : (
          koneksiData.map((user) => (
            <div key={user.id} className="flex gap-3 items-start bg-white border border-gray-300 rounded-xl p-3 shadow-sm">
              <FaUserCircle className="text-blue-600 text-3xl" />
              <div className="flex-1">
                <p className="font-semibold">{user.nama}</p>
                <p className="text-xs text-gray-600">{user.posisi}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-md border text-sky-500 px-2 py-2 rounded"><FaTelegramPlane /></button>
                <button className="text-md border text-red-500 px-2 py-2 rounded"><FaXmark /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ListKoneksi
