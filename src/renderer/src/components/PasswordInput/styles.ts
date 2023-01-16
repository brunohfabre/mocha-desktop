import { styled } from '../../styles'
import { Text } from '../Text'

export const Container = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  color: '$gray500',
})

export const Input = styled('input', {
  all: 'unset',
  flex: 1,
  color: '$gray900',
  fontSize: '$sm',
  transition: 'all 0.150s',
  height: 40,
  cursor: 'text',

  '&::placeholder': {
    color: '$gray300',
  },
})

export const InputContainer = styled('div', {
  height: 40,
  backgroundColor: '$gray100',
  borderRadius: 8,
  outline: 0,
  border: '2px solid $gray100',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 12,

  '&:focus-within': {
    borderColor: '$violet500',
    boxShadow: '0 0 0 2px $colors$violet200',
  },

  variants: {
    isErrored: {
      true: {
        borderColor: '$red500',
        backgroundColor: '$red50',
      },
    },
  },
})

export const Button = styled('button', {
  all: 'unset',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})
