import { styled } from '../../styles'
import { Text } from '../Text'

export const Container = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  color: '$gray500',
})

export const Input = styled('input', {
  height: 40,
  backgroundColor: '$gray100',
  borderRadius: 8,
  padding: '0 12px',
  color: '$gray900',
  fontSize: '$sm',
  outline: 0,
  border: '2px solid $gray100',
  transition: 'all 0.150s',

  '&:focus': {
    borderColor: '$violet500',
    boxShadow: '0 0 0 2px $colors$violet200',
  },

  '&::placeholder': {
    color: '$gray300',
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
