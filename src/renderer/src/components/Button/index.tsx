import { ComponentProps, forwardRef, ReactNode } from 'react'

import { Spinner } from '../Spinner'
import { Container } from './styles'

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
} & ComponentProps<typeof Container>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, disabled, ...props }, ref) => {
    return (
      <Container ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading ? <Spinner /> : children}
      </Container>
    )
  },
)
