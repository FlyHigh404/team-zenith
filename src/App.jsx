import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import GuestRoute from './auth/GuestRoute'

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
import SemuaLamaran from './pages/lamaran/SemuaLamaran'
import Koneksi from './pages/Koneksi'

import NotFound from './pages/NotFound'

import { AuthProvider } from './auth/AuthProvider'


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Router>
        <AuthProvider>
          <Routes>
            {/* Halaman auth tanpa layout */}
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <GuestRoute>
                  <ForgotPassword />
                </GuestRoute>
              }
            />

            {/* Halaman dengan Navbar */}
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Halaman Admin */}
            <Route
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
              <Route path="/pekerjaan-admin" element={<PekerjaanAdmin />} />
              <Route path="/sertifikasi-admin" element={<SertifikasiAdmin />} />
              <Route path="/pelamar-sertifikasi" element={<PelamarSertifikasi />} />
              <Route path="/pelamar-pekerjaan" element={<PelamarPekerjaan />} />
            </Route>

            {/* Halaman Cari Pekerjaan dan Sertifikasi */}
            <Route
              element={
                <ProtectedRoute>
                  <ForumLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/list-loker" element={<ForumLoker />} />
              <Route path="/list-sertifikasi" element={<ForumSertifikasi />} />
            </Route>

            {/* Halaman Simpan */}
            <Route
              element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/loker/apply/:id" element={<LokerApply />} />
              <Route path="/sertifikasi/apply/:id" element={<SertifikasiApply />} />
              <Route path="/simpan-postingan" element={<SimpanPostingan />} />
              <Route path="/simpan-pekerjaan" element={<SimpanPekerjaan />} />
              <Route path="/simpan-sertifikasi" element={<SimpanSertifikasi />} />
            </Route>

            {/* Halaman User dan Admin */}
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout2 />
                </ProtectedRoute>
              }
            >
              <Route path="/beranda-admin" element={<BerandaAdmin />} />
              <Route path="/profil-admin" element={<ProfilAdmin />} />
              <Route path="/loker/:id" element={<DetailLoker />} />
              <Route path="/lamaran" element={<SemuaLamaran />} />
              <Route path="/koneksi" element={<Koneksi />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
