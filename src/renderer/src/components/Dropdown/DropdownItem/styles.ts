import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { styled } from '../../../styles'

export const Container = styled(DropdownMenu.Item, {
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
