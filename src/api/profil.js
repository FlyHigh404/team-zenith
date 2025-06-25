import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

//Ambil data user login
export const getProfil = async () => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data
}

//Upload foto profil


//Update profil
export const updateProfil = async (formData) => {
  const response = await axios.post(`${API_URL}/profile?_method=put`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

//Hapus foto profil
export const deleteFotoProfil = async () => {
  const response = await axios.delete(`${API_URL}/profile/photo`, {
        headers: { Authorization: `Bearer ${getToken()}` },
  })
    return response.data
}