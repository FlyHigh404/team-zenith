import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const fetchAllJobs = async () => {
  const response = await axios.get(`${API_URL}/admin/job-listings`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response
}

// export const updateJob = async (id, payload, isFormData = false) => {
//   const headers = {
//     Authorization: `Bearer ${getToken()}`,
//   }
//   if (isFormData) headers['Content-Type'] = 'multipart/form-data'
//   const response = await axios.put(`${API_URL}/admin/job-listings/${id}`, payload, { headers })
//   return response
// }

export const updateJob = async (id, formData, isFormData = false) => {
  return await axios.post(`${API_URL}/admin/job-listings/${id}?_method=PUT`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    },
  })
}

export const addJob = async (formData) => {
  return await axios.post(`${API_URL}/admin/job-listings`, formData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
}

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/job-listings/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  return response
}

export const getPelamarJobs = async (id) => {
  const res = await axios.get(`${API_URL}/admin/job-listings/${id}/applicants`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return {
    pendaftar: res.data?.data || [] // Pastikan ini bentuk array
  };
}
