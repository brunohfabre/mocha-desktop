import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Container } from './styles'

type DropdownContentProps = {
  children: ReactNode
}

export function DropdownContent({ children }: DropdownContentProps) {
  return (
    <DropdownMenu.Content asChild sideOffset={4}>
      <Container>{children}</Container>
    </DropdownMenu.Content>
  )
}
