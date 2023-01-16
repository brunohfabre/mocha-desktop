import { ComponentProps, forwardRef } from 'react'
import { Text } from '../Text'
import { Container, Input } from './styles'

type TextInputProps = {
  label: string
  error?: string
} & ComponentProps<typeof Input>

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Container as="label" size="sm">
        {label}

        <Input ref={ref} isErrored={!!error} {...props} />

        {!!error && (
          <Text size="sm" css={{ color: '$red500' }}>
            {error}
          </Text>
        )}
      </Container>
    )
  },
)
