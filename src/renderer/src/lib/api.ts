import { env } from '@/env'
import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: env.RENDERER_VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    toast.error('API error')

    return Promise.reject(error)
  }
)
