import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const activeUserList = async (page = 1) => {
  const response = await axios.get(`${API_URL}/get-active-userlist?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const jobList = async (page = 1) => {
  const response = await axios.get(`${API_URL}/job-listings?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const ajukanKoneksi = async (koneksi_user_id) => {
  const response = await axios.post(
    `${API_URL}/connections/ajukan`,
    { koneksi_user_id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const listKoneksi = async () => {
  const response = await axios.get(`${API_URL}/connections`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}
