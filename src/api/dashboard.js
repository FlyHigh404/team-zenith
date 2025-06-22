import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}/admin`

export const allUserList = async (page = 1) => {
  const response = await axios.get(`${API_URL}/user-list/all-users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const activeUserList = async (page = 1) => {
  const response = await axios.get(`${API_URL}/get-active-userlist?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const allCompanyList = async () => {
  const response = await axios.get(`${API_URL}/companies`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const allJobList = async () => {
  const response = await axios.get(`${API_URL}/job-listings/statistics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const allCertificateList = async () => {
  const response = await axios.get(`${API_URL}/certification-lists/statistics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const allJobs = async () => {
  const response = await axios.get(`${API_URL}/job-listings`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}
