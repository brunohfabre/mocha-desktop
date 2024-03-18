import { ReactNode } from 'react'

import { UpdateProvider } from './update'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <UpdateProvider>{children}</UpdateProvider>
}
