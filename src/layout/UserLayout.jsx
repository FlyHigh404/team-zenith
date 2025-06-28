// import NavbarUser from '../components/user/NavbarUser'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/admin/Navbar2'

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default UserLayout
