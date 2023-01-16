import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  name: string
  email: string
  bio?: string
  avatar_url?: string
}

type SignInData = {
  user: User
  token: string
}

type Store = {
  user: User | null
  token: string
  signIn: (data: SignInData) => void
  signOut: () => void
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      user: null,
      token: '',
      signIn: ({ user, token }: SignInData) => set(() => ({ user, token })),
      signOut: () =>
        set(() => ({
          user: null,
          token: '',
        })),
    }),
    {
      name: 'auth-store',
    },
  ),
)
