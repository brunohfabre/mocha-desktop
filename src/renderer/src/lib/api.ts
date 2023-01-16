import { toast } from 'react-hot-toast'

import axios, { AxiosHeaders } from 'axios'

import { useAuthStore } from '../stores/authStore'

const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3333'
    : 'http://137.184.232.126:3333'

const api = axios.create({
  baseURL,
})

api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token

  if (config.headers && token) {
    config.headers = {
      ...config.headers,
      authorization: `Bearer ${token}`,
    } as AxiosHeaders
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)

    if (error.response?.data.status === 'auth_error') {
      useAuthStore.getState().signOut()

      return
    }

    toast.error(error.response.data.message)

    return Promise.reject(error.response)
  },
)

export { api }
