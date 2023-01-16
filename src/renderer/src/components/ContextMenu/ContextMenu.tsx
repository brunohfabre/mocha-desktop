import { ReactNode } from 'react'

import * as RadixContextMenu from '@radix-ui/react-context-menu'

type ContextMenuProps = {
  children: ReactNode[]
}

export function ContextMenu({ children }: ContextMenuProps) {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger>{children[0]}</RadixContextMenu.Trigger>

      <RadixContextMenu.Portal>{children[1]}</RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  )
}
