import React from 'react'
import NavbarUser from '../components/user/NavbarUser'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <>
            <NavbarUser />
            <Outlet />
        </>
    )
}

export default UserLayout
