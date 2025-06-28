import React from 'react'
import Navbar2 from '../components/admin/Navbar2'
import { Outlet } from 'react-router-dom'

const AdminLayout2 = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
    </>
  )
}

export default AdminLayout2
