import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BASE_URL}/auth`

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data
}

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data)
  return response.data
}

export const getRedirectPath = (role) => (role === 'admin' ? '/dashboard-admin' : '/beranda-admin')
export const fetchUser = async (token) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data.data
}
