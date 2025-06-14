import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { getToken } from '../utils/token'

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth()
  const token = getToken()

  if (user === undefined) return <div>Loading...</div>
  if (!user || !token) return <Navigate to="/login" />
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/dashboard-admin' : '/beranda-admin'} />
  }
  return children
}

export default ProtectedRoute
