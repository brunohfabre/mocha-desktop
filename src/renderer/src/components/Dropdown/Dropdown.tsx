import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type DropdownProps = {
  children: ReactNode[]
}

export function Dropdown({ children }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children[0]}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>{children[1]}</DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
