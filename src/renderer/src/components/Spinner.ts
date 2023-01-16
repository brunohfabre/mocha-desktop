import { keyframes, styled } from '../styles'

const animation = keyframes({
  to: {
    transform: 'rotate(360deg)',
  },
})

export const Spinner = styled('div', {
  width: 18,
  height: 18,
  borderRadius: '50%',
  border: '2px solid',
  animation: `${animation} 0.9s linear infinite`,
  transition: 'border-color 0.150s',

  borderColor: '$gray300',
  borderLeftColor: '$gray600',

  variants: {
    inverted: {
      true: {
        borderColor: '$gray600',
        borderLeftColor: '$gray300',
      },
    },
  },
})
