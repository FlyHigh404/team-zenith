import { useState, useEffect } from 'react'
import { getToken, setToken, removeToken } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './useAuth'
import toast from 'react-hot-toast'
import axios from 'axios'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setUser(null)
      return
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({ token, ...res.data.data })
      })
      .catch(() => {
        setUser(null)
        removeToken()
      })
  }, [])

  const loginUser = (token) => {
    setToken(token)
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({ token, ...res.data.data })
        console.log('Role: ', res)
        // cek role:
        if (res.data.data.role === 'admin') {
          navigate('/dashboard-admin')
        } else {
          navigate('/beranda-admin')
        }
      })
      .catch(() => {
        toast.error('Gagal mengambil data user')
      })
  }

  const logoutUser = () => {
    removeToken()
    setUser(null)
    navigate('/login')
    return toast.success('Logout berhasil!')
  }

  return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}
