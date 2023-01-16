import { ReactNode } from 'react'

import { Heading } from '../Heading'
import { Text } from '../Text'
import { Container } from './styles'

type EmptyProps = {
  title: string
  description?: string
  children?: ReactNode
}

export function Empty({ title, description, children }: EmptyProps) {
  return (
    <Container>
      <div>
        <Heading size="md">{title}</Heading>

        {description && <Text size="sm">{description}</Text>}
      </div>

      {children}
    </Container>
  )
}
