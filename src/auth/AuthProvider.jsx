import { useState, useEffect } from 'react'
import { getToken, setToken, removeToken, getUserData, removeUserData } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './useAuth'
import toast from 'react-hot-toast'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    const userData = getUserData()
    if (token && userData) setUser({ token, ...userData })
  }, [])

  const loginUser = (token) => {
    setToken(token)
    const userData = getUserData()
    setUser({ token, ...userData })
    navigate('/dashboard-admin')
  }

  const logoutUser = () => {
    if (!user) {
      return toast.error('Logout gagal!')
    } else if (user.token === '') {
      return toast.error('Anda belum login!')
    }
    removeToken()
    removeUserData()
    setUser(null)
    navigate('/login')
    return toast.success('Logout berhasil!')
  }

  return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}
