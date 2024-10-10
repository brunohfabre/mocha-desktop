import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  name: string | null
  email: string
}

type Store = {
  token: string
  user: User | null

  setToken: (token: string) => void
  setUser: (user: User) => void
  clearCredentials: () => void
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,

      setToken: (token: string) =>
        set(() => ({
          token,
        })),
      setUser: (user: User) =>
        set(() => ({
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
