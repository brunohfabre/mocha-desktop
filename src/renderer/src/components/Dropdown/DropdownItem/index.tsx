import { ComponentProps, ReactNode } from 'react'

import { Container } from './styles'

type DropdownItemProps = {
  children: ReactNode
} & ComponentProps<typeof Container>

export function DropdownItem({ children, ...props }: DropdownItemProps) {
  return <Container {...props}>{children}</Container>
}
