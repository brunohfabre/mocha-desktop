import axios from 'axios'
import { toast } from 'sonner'

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

    const workspace = localStorage.getItem('mocha:workspace')

    if (workspace) {
      const { id } = JSON.parse(workspace)

      config.headers['workspace-id'] = id
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      toast.error('Service not available. Try again later.')
    }

    if (error.response.status === 401) {
      useAuthStore.getState().clearCredentials()

      return
    }

    toast.error(error.response.data.message)

    return Promise.reject(error)
  },
)
