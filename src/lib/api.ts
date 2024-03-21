import axios from 'axios'
import { toast } from 'sonner'

import { env } from '@/env'
import { useAuthStore } from '@/stores/auth'
import { useWorkspaceStore } from '@/stores/workspace'

export const api = axios.create({
  baseURL: env.VITE_APP_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const workspace = useWorkspaceStore.getState().workspaceSelected

    if (workspace) {
      config.headers['workspace-id'] = workspace
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
    if (error.response.status === 401) {
      useAuthStore.getState().clearCredentials()

      return
    }

    if (error.code === 'ERR_NETWORK' || error.response.status === 502) {
      toast.error('Service not available. Try again later.')
    }

    if (error.response.data.message) {
      toast.error(error.response.data.message)
    }

    return Promise.reject(error)
  },
)
