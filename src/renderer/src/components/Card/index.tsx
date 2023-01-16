import { ComponentProps, forwardRef, ReactNode } from 'react'

import { Container } from './styles'

type CardProps = {
  children: ReactNode
} & ComponentProps<typeof Container>

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <Container ref={ref} {...props}>
        {children}
      </Container>
    )
  },
)
