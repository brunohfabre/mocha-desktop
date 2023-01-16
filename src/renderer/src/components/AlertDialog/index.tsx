import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '../Button'
import { Heading } from '../Heading'
import { Text } from '../Text'
import { Content, Overlay } from './styles'

type AlertDialogProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  description: string
  onAction: () => void
  actionLoading?: boolean
  actionText?: string
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  onAction,
  actionLoading,
  actionText = 'Yes',
}: AlertDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Overlay />

        <Dialog.Content asChild>
          <Content>
            <Dialog.Title asChild>
              <Heading size="md">{title}</Heading>
            </Dialog.Title>

            <Text size="sm">{description}</Text>

            <footer>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                variant="secondary"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={onAction}
                variant="danger"
                isLoading={actionLoading}
              >
                {actionText}
              </Button>
            </footer>
          </Content>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
