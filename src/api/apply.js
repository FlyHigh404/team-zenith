import axios from 'axios'
import { getToken } from '../utils/token'

const API_URL = `${import.meta.env.VITE_BASE_URL}`

export const applyJobs = async () => {
    const response = await axios.get(`${API_URL}/job-listings/my-applications`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response
}

export const applySertif = async () => {
    const response = await axios.get(`${API_URL}/certification-programs/my-applications`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
    return response
}
