import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserType = {
  id: string
  name: string
  email: string
}

interface SetCredentialsData {
  token: string
  user: UserType
}

interface Store {
  token: string
  user: UserType | null
  setCredentials: (data: SetCredentialsData) => void
  clearCredentials: () => void
}

export const authStore = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      setCredentials: ({ token, user }: SetCredentialsData) =>
        set(() => ({
          token,
          user,
        })),
      clearCredentials: () =>
        set(() => ({
          token: '',
          user: null,
        })),
    }),
    {
      name: 'mocha.auth',
    },
  ),
)
