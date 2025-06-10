import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AdminLayout from './layout/AdminLayout'
import AdminLayout2 from './layout/AdminLayout2'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import PekerjaanAdmin from './pages/admin/PekerjaanAdmin'
import ProfilAdmin from './pages/admin/ProfilAdmin'
import BerandaAdmin from './pages/admin/BerandaAdmin'
import SertifikasiAdmin from './pages/admin/SertifikasiAdmin'
import PelamarSertifikasi from './pages/admin/PelamarSertifikasi'
import PelamarPekerjaan from './pages/admin/PelamarPekerjaan'

import Layout from './layout/Layout'
import LandingPage from './pages/LandingPage'

import { Toaster } from 'react-hot-toast'

import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

// import ProtectedLayout from './components/ProtectedLayout';
import ForumLayout from './layout/ForumLayout'
import ForumLoker from './pages/forum/ForumLoker'
import DetailLoker from './pages/forum/DetailLoker'
import UserLayout from './layout/UserLayout'
import LokerApply from './pages/user/LokerApply'

import ForumSertifikasi from './pages/forum/ForumSertifikasi'
import SertifikasiApply from './pages/user/SertifikasiApply'
import SimpanPostingan from './pages/user/SimpanPostingan'
import SimpanPekerjaan from './pages/user/SimpanPekerjaan'
import SimpanSertifikasi from './pages/user/SimpanSertifikasi'

import { AuthProvider } from './auth/AuthProvider'

function App() {
  // const user = { role: 'admin' } contoh, bisa dari context, api, redux

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <AuthProvider>
          <Routes>
            {/* Halaman auth tanpa layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Halaman dengan Navbar */}
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Halaman Admin */}
            <Route element={<AdminLayout />}>
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
              <Route path="/pekerjaan-admin" element={<PekerjaanAdmin />} />
              <Route path="/sertifikasi-admin" element={<SertifikasiAdmin />} />
              <Route path="/pelamar-sertifikasi" element={<PelamarSertifikasi />} />
              <Route path="/pelamar-pekerjaan" element={<PelamarPekerjaan />} />
            </Route>

            <Route element={<AdminLayout2 />}>
              <Route path="/profil-admin" element={<ProfilAdmin />} />
              <Route path="/beranda-admin" element={<BerandaAdmin />} />
              <Route path="/loker/:id" element={<DetailLoker />} />
            </Route>

            <Route element={<ForumLayout />}>
              <Route path="/forum/loker" element={<ForumLoker />} />
              <Route path="/forum/sertifikasi" element={<ForumSertifikasi />} />
            </Route>

            <Route element={<UserLayout />}>
              <Route path="/loker/apply/:id" element={<LokerApply />} />
              <Route path="/sertifikasi/apply/:id" element={<SertifikasiApply />} />
              <Route path="/simpan/postingan" element={<SimpanPostingan />} />
              <Route path="/simpan/pekerjaan" element={<SimpanPekerjaan />} />
              <Route path="/simpan/sertifikasi" element={<SimpanSertifikasi />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
