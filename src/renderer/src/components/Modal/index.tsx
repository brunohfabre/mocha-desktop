import { ReactNode } from 'react'

import { X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import { Card } from '../Card'
import { Heading } from '../Heading'
import { IconButton } from '../IconButton'
import { Content, Overlay } from './styles'

type ModalProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  children: ReactNode
}

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />

        <Content asChild>
          <Card>
            <header>
              <Dialog.Title asChild>
                <Heading size="sm">{title}</Heading>
              </Dialog.Title>
              <Dialog.Close asChild>
                <IconButton type="button" variant="ghost" size="sm">
                  <X weight="bold" />
                </IconButton>
              </Dialog.Close>
            </header>

            {children}
          </Card>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
