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

  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session] = useState(null)

  function signIn() {
    console.log('sign-in')
  }

  function signOut() {
    console.log('sign-out')
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
