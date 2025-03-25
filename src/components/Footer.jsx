import React from 'react'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#1201C9] text-white text-center py-4">
      <p>Copyright &copy; {year} UNEDO</p>
    </footer>
  )
}

export default Footer
