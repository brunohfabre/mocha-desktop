import axios from 'axios'
import { env } from '@/env'
import { useAuthStore } from '@/stores/auth'

export const api = axios.create({
  baseURL: env.VITE_APP_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
