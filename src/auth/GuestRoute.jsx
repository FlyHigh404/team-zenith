import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const GuestRoute = ({ children }) => {
  const { user } = useAuth()
  if (user === undefined) return null
  if (!user) return children
  if (user.role === 'admin') return <Navigate to="/dashboard-admin" />
  return <Navigate to="/beranda-admin" />
}

export default GuestRoute
