import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'

const getTitle = (path) => {
    switch (path) {
        case '/dashboard-admin':
            return 'Overview'
        case '/pekerjaan-admin':
            return 'Pekerjaan'
        case '/sertifikasi-admin':
            return 'Sertifikasi'
        default:
            return 'Dashboard'
    }
}

const AdminLayout = () => {
    const location = useLocation();
    console.log(location.pathname);
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
