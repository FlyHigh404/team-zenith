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
  )
}

export default App
