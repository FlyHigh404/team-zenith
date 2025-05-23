import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AdminLayout from './layout/AdminLayout'
import AdminLayout2 from './layout/AdminLayout2'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import PekerjaanAdmin from './pages/admin/PekerjaanAdmin'
import ProfilAdmin from './pages/admin/ProfilAdmin'

import Layout from './layout/Layout'
import LandingPage from './pages/LandingPage'

import { Toaster } from 'react-hot-toast'

import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
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
          </Route>

          <Route element={<AdminLayout2 />}>
            <Route path="/profil-admin" element={<ProfilAdmin />} />
          </Route>
            
        </Routes>
      </Router>
    </>
  )
}

export default App
