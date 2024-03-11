import { ReactNode } from 'react'

import { AuthContextProvider } from './auth'
import { UpdateProvider } from './update'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <UpdateProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </UpdateProvider>
  )
}
