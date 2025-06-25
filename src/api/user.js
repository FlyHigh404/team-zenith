import axios from 'axios'
import { getToken } from '../utils/token'
const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const fetchUserById = async (id) => {
  const response = await axios.get(`${API_URL}/user/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data.data
}
