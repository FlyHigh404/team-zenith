import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const fetchSertifikasi = async () => {
  const response = await axios.get(`${API_URL}/certification-programs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data.data
}

export const fetchSertifikasiById = async (id) => {
  const response = await axios.get(`${API_URL}/certification-programs/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data.data
}

export const applySertifikasi = async (id, body = {}) => {
  const response = await axios.post(`${API_URL}/certification-programs/${id}/apply`, body, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data
}

export const fetchLoker = async (page = 1) => {
  const response = await axios.get(`${API_URL}/job-listings?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data.data
}

export const fetchLokerById = async (id) => {
  const response = await axios.get(`${API_URL}/job-listings/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response.data.data
}

export const applyLoker = async (id, body) => {
  const response = await axios.post(`${API_URL}/job-listings/${id}/apply`, body, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
