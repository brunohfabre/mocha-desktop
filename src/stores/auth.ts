import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserType = {
  id: string
  name?: string
  email: string
  avatarUrl?: string
}

type Store = {
  token: string
  user: UserType | null

  setCredentials: (data: {token: string; user: UserType}) => void
  clearCredentials: () => void
}

export const useAuthStore = create(persist<Store>((set) => ({
  token: '',
  user: null,
  
  setCredentials: ({ token, user }: { token: string; user: UserType }) => set(() => ({
    token, user
  })),
  clearCredentials: () => set(() => ({
    token: '',
    user: null
  }))
}), {
  name: 'mocha.auth'
}))