import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    show && (
      <button onClick={handleClick} className="fixed bottom-8 right-8 z-50 bg-sky-500 text-white p-3 rounded-full shadow-lg hover:bg-sky-600 transition-all" aria-label="Scroll to top">
        <FaArrowUp className="text-xl" />
      </button>
    )
  )
}

export default ScrollToTopButton
