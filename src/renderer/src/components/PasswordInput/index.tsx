import { ComponentProps, forwardRef, useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'

import { Button, Container, Input, InputContainer } from './styles'
import { Text } from '../Text'

type PasswordInputProps = {
  label: string
  error?: string
} & ComponentProps<typeof Input>

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, ...props }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <Container as="label" size="sm">
        {label}

        <InputContainer isErrored={!!error}>
          <Input ref={ref} type={visible ? 'text' : 'password'} {...props} />

          <Button
            onClick={() => setVisible((prevState) => !prevState)}
            tabIndex={-1}
            type="button"
          >
            {visible ? (
              <EyeSlash weight="fill" size={16} />
            ) : (
              <Eye weight="fill" size={16} />
            )}
          </Button>
        </InputContainer>

        {!!error && (
          <Text size="sm" css={{ color: '$red500' }}>
            {error}
          </Text>
        )}
      </Container>
    )
  },
)
