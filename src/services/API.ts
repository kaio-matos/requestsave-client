import axios from 'axios'
const apiURL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_PROD_URL

const API = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export { API }
