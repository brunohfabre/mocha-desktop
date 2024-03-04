import { ReactNode } from 'react'

import { AuthContextProvider } from './auth'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
