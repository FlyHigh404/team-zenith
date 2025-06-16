function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        <a href="/" className="text-blue-500 hover:underline">
          Return
        </a>
      </p>
    </div>
  )
}

export default NotFound
