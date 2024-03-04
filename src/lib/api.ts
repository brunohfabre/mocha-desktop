import axios from 'axios'
import { toast } from 'sonner'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_APP_API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      toast.error('Service not available. Try again later.')
    }

    toast.error(error.response.data.message)

    return Promise.reject(error)
  },
)
