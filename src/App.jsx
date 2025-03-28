import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Register from './pages/Register'
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* <Route path='/' element={<Landing />} /> Route default */}
          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
