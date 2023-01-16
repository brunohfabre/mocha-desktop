import { styled } from '../../styles'

export const Container = styled('button', {
  all: 'unset',

  borderRadius: 8,
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
      ghost: {
        color: '$gray900',

        '&:not(:disabled):focus': {
          boxShadow: '0 0 0 2px $colors$gray50',
        },

        '&:not(:disabled):hover': {
          backgroundColor: '$gray100',
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
    size: {
      md: {
        height: 40,
        width: 40,

        svg: {
          maxWidth: 16,
          maxHeight: 16,
        },
      },
      sm: {
        height: 32,
        width: 32,

        svg: {
          maxWidth: 16,
          maxHeight: 16,
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
