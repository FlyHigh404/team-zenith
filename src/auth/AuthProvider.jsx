import { useState, useEffect } from 'react'
import { getToken, setToken, removeToken } from '../utils/token'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './useAuth'
import { setUserData, removeUserData } from '../utils/token'
import toast from 'react-hot-toast'
import axios from 'axios'
import { getRedirectPath } from '../api/auth'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setUser(null)
      return
    }
    fetchUser(token)
      .then((user) => {
        setUser({ token, ...user })
        setUserData(user)
      })
      .catch(() => {
        setUser(null)
        removeToken()
        removeUserData()
      })
  }, [])

  const fetchUser = async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data.data
  }

  const loginUser = (token) => {
    setToken(token)
    fetchUser(token)
      .then((user) => {
        setUser({ token, ...user })
        setUserData(user)
        navigate(getRedirectPath(user.role))
      })
      .catch(() => toast.error('Gagal mengambil data user'))
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
