<<<<<<< HEAD
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Next from './pages/Next'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Landing />} /> Route default */}
        <Route path="/register" element={<Register />} />
        <Route path="/register-next" element={<Next />} />
      </Routes>
    </Router>
=======
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="h-[2000px] bg-white">
        {' '}
        <h1 className="text-3xl text-center min-h-screen flex items-center justify-center">Welcome to UNEDO Website</h1>
      </div>
      <Footer />
    </>
>>>>>>> 63a0c0e0ae600d22033ca6d391205ca62c205078
  )
}

export default App
