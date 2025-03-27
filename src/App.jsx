import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Next from './pages/Next'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Landing />} /> Route default */}
        <Route path="/register" element={<Register />} />
        <Route path="/register-next" element={<Next />} />
        <Route path="/login" element={<Login />}/>

      </Routes>
    </Router>
  )
}

export default App
