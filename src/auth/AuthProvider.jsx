import { useState, useEffect } from 'react'
import { getToken, setToken, removeToken } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './useAuth'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (token) setUser({ token })
  }, [])

  const loginUser = (token) => {
    setToken(token)
    setUser({ token })
    navigate('/dashboard-admin')
  }

  const logoutUser = () => {
    removeToken()
    setUser(null)
    navigate('/login')
  }

  return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}
