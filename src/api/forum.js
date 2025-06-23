import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}` // BUKAN /auth

export const fetchSertifikasi = async () => {
  const res = await axios.get(`${API_URL}/certification-programs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return res.data.data
}
