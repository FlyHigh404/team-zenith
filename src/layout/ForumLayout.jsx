import React from 'react'
import NavbarBiru from '../components/admin/NavbarBiru'
import { Outlet } from 'react-router-dom'

const ForumLayout = () => {
    return (
        <div>
            <NavbarBiru />
            <Outlet />
        </div>
    )
}

export default ForumLayout
