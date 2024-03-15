import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_APP_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem('mocha:session')

    if (session) {
      const { token } = JSON.parse(session)

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
