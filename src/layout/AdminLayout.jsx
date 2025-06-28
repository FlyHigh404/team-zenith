import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'

const getTitle = (path) => {
  switch (path) {
    case '/dashboard-admin':
      return 'Overview'
    case '/pekerjaan-admin':
      return 'Kelola Pekerjaan'
    case '/sertifikasi-admin':
      return 'Kelola Sertifikasi'
    case '/mitra-admin':
      return 'Mitra Perusahaan'
    case '/pelamar-sertifikasi':
      return 'Daftar Pelamar Sertifikasi'
    case '/pekerjaan-admin/pelamar':
      return 'Daftar Pelamar Pekerjaan'
    default:
      return 'Dashboard'
  }
}

const AdminLayout = () => {
  const location = useLocation()
  const title = getTitle(location.pathname)

  return (
    <>
      <Navbar title={title} /> {/* kirim title ke Navbar */}
      <Sidebar />
      <Outlet />
    </>
  )
}

export default AdminLayout
