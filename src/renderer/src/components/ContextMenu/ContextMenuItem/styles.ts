import * as RadixContextMenu from '@radix-ui/react-context-menu'

import { styled } from '../../../styles'

export const Container = styled(RadixContextMenu.Item, {
  minHeight: 32,
  padding: '0 12px',
  display: 'flex',
  alignItems: 'center',
  minWidth: 128,
  maxWidth: 320,
  fontSize: '$sm',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$gray100',
  },

  variants: {
    type: {
      danger: {
        color: '$red500',

        '&:hover': {
          backgroundColor: '$red100',
        },
      },
    },
  },
})
