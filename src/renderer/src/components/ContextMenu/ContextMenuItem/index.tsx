import { ComponentProps, ReactNode } from 'react'

import { Container } from './styles'

type ContextMenuItemProps = {
  children: ReactNode
} & ComponentProps<typeof Container>

export function ContextMenuItem({ children, ...props }: ContextMenuItemProps) {
  return <Container {...props}>{children}</Container>
}
