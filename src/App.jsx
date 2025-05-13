import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
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
        </Routes>
      </Router>
    </>
  )
}

export default App
