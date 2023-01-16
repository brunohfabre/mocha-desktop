import { ReactNode } from 'react'

import * as RadixContextMenu from '@radix-ui/react-context-menu'

import { Container } from './styles'

type ContextMenuContentProps = {
  children: ReactNode
}

export function ContextMenuContent({ children }: ContextMenuContentProps) {
  return (
    <RadixContextMenu.Content asChild>
      <Container>{children}</Container>
    </RadixContextMenu.Content>
  )
}
