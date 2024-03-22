import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useOrganizationStore } from './organization'

type User = {
  id: string
  name: string
  email: string
}

type SetCredentialsData = {
  token: string
  user: User
}

interface Store {
  token: string
  user: User | null
  setCredentials: (data: SetCredentialsData) => void
  clearCredentials: () => void
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      setCredentials: ({ token, user }: SetCredentialsData) =>
        set(() => ({
          token,
          user,
        })),
      clearCredentials: () => {
        useOrganizationStore.getState().selectOrganization('')

        set(() => ({
          token: '',
          user: null,
        }))
      },
    }),
    {
      name: 'auth',
    },
  ),
)
