import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const getAllSertifikasi = async () => {
    const response = await axios.get(`${API_URL}/admin/certification-lists`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response
}

export const createSertifikasi = async (formData) => {
    return await axios.post(`${API_URL}/admin/certification-lists`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const updateSertifikasi = async (id, formData, isFormData = false) => {
    try {
        return await axios.post(`${API_URL}/admin/certification-lists/${id}?_method=PUT`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            }
        })
    } catch (error) {
        console.error('❌ Gagal update sertifikasi:', error.response?.data)
        throw error
    }
}
export const deleteSertifikasi = async (id) => {
    return await axios.delete(`${API_URL}/admin/certification-lists/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const getPelamarSertifikasi = async (id) => {
    const response = await axios.get(`${API_URL}/admin/certification-lists/${id}/applicants`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response
}
