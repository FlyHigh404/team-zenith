import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const fetchAllPostingan = async (page) => {
  const response = await axios.get(`${API_URL}/postingan/?page=${page}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data
}

export const createPostingan = async (body) => {
  const response = await axios.post(`${API_URL}/postingan`, body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
