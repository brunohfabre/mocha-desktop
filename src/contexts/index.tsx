import type { ReactNode } from 'react'

import { TabsContextProvider } from './tabs'

export function AppProvider({ children }: { children: ReactNode }) {
  return <TabsContextProvider>{children}</TabsContextProvider>
}
