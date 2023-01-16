import { styled } from '../../styles'

export const Container = styled('button', {
  all: 'unset',
  height: 40,
  borderRadius: 8,
  padding: '0 16px',
  cursor: 'pointer',

  fontSize: '$sm',
  fontWeight: '$semiBold',

  transition: 'all 0.150s',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },

  gap: 8,

  svg: {
    maxWidth: 16,
    maxHeight: 16,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$violet500',
        color: '$white',

        '&:focus': {
          boxShadow: '0 0 0 2px $colors$violet200',
        },

        '&:not(:disabled):hover': {
          backgroundColor: '$violet600',
        },
      },
      secondary: {
        backgroundColor: '$gray100',
        color: '$gray900',

        '&:not(:disabled):focus': {
          boxShadow: '0 0 0 2px $colors$gray50',
        },

        '&:not(:disabled):hover': {
          backgroundColor: '$gray200',
        },
      },
      danger: {
        backgroundColor: '$red500',
        color: '$white',

        '&:focus': {
          boxShadow: '0 0 0 2px $colors$red200',
        },

        '&:not(:disabled):hover': {
          backgroundColor: '$red600',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})
