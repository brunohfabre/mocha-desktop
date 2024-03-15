import { ReactNode, createContext, useContext, useState } from 'react'

import { api } from '@/lib/api'

type User = {
  id: string
  name: string
  email: string
}

type Session = {
  token: string
  user: User
}

interface AuthContextData {
  session: Session | null

  verifySession: () => void
  signIn: (data: Session) => void
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session, setSession] = useState<Session | null>(() => {
    const persistedData = localStorage.getItem('mocha:session')

    if (persistedData) {
      return JSON.parse(persistedData)
    }

    return null
  })

  async function verifySession() {
    const response = await api.get('/me')

    console.log(response)
  }

  function signIn(data: Session) {
    setSession(data)

    localStorage.setItem('mocha:session', JSON.stringify(data))
  }

  function signOut() {
    setSession(null)
    localStorage.removeItem('mocha:session')
    localStorage.removeItem('mocha:workspace')
  }

  return (
    <AuthContext.Provider value={{ session, verifySession, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
