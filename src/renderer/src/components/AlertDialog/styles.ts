import * as Dialog from '@radix-ui/react-dialog'

import { keyframes, styled } from '../../styles'
import { Card } from '../Card'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

export const Content = styled(Card, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  maxWidth: 440,

  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 24,
  },

  '&:focus': {
    outline: 'none',
  },
})
