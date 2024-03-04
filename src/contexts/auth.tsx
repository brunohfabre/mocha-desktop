import { ReactNode, createContext, useContext, useState } from 'react'

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

  function signIn(data: Session) {
    setSession(data)

    localStorage.setItem('mocha:session', JSON.stringify(data))
  }

  function signOut() {
    setSession(null)
    localStorage.removeItem('mocha:session')
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
