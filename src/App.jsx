import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import { Toaster } from 'react-hot-toast'
import Register from './pages/Register'
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Halaman tanpa Navbar */}
          <Route path="/register" element={<Register />} />

          {/* Halaman dengan Navbar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
