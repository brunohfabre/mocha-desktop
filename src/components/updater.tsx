import type { ReactNode } from 'react'

interface UpdaterProps {
  children: ReactNode
}

export function Updater({ children }: UpdaterProps) {
  return <div>{children}</div>
}
