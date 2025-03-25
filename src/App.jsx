import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Next from './pages/Next'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Landing />} /> Route default */}
          <Route path="/register" element={<Register />} />
          <Route path="/register-next" element={<Next />} />

        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
