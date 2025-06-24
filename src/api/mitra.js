import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const fetchAllMitra = async () => {
  const response = await axios.get(`${API_URL}/admin/companies`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data
}

export const tambahMitra = async (formData) => {
  const response = await axios.post(`${API_URL}/admin/companies`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const updateMitra = async (id, formData) => {
  const response = await axios.post(`${API_URL}/admin/companies/${id}?_method=PUT`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const hapusMitra = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/companies/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data
}
