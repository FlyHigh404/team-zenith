import { useState, useEffect } from 'react'
import { getToken, setToken, removeToken } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './useAuth'
import { setUserData, getUserData, removeUserData } from '../utils/token'
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
    const cachedUser = getUserData()
    if (cachedUser) {
      setUser({ token, ...cachedUser })
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data.data
        setUser({ token, ...user })
        setUserData(user)
      })
      .catch(() => {
        setUser(null)
        removeToken()
        removeUserData()
      })
  }, [])

  const loginUser = (token) => {
    setToken(token)
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data.data
        setUser({ token, ...res.data.data })
        console.log('Role: ', res)
        setUserData(user)
        // cek role:
        if (user.role === 'admin') {
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
    removeUserData()
    setUser(null)
    navigate('/login')
    return toast.success('Logout berhasil!')
  }

  return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}
