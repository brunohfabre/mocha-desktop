import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserType = {
  id: string
  name: string
  email: string
}

type Store = {
  token: string
  user: UserType | null

  setCredentials: (data: { token: string; user: UserType }) => void
  clearCredentials: () => void
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      setCredentials: ({ token, user }) =>
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
    }
  )
)
