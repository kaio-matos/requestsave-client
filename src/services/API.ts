import axios from 'axios'
const apiURL = import.meta.env.VITE_API_URL || 'https://adm.kaiomatos.com.br/api'

const API = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export { API }
