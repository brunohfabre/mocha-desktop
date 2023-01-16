import { styled } from '../styles'

export const Text = styled('p', {
  color: '$textTitle',

  a: {
    fontWeight: '$medium',
    color: '$violet500',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  variants: {
    size: {
      xs: {
        fontSize: '$xs',
        lineHeight: '1rem',
      },
      sm: {
        fontSize: '$sm',
        lineHeight: '1.25rem',
      },
      md: {
        fontSize: '$md',
        lineHeight: '1.5rem',
      },
      lg: {
        fontSize: '$lg',
        lineHeight: '1.75rem',
      },
      xl: {
        fontSize: '$xl',
        lineHeight: '1.75rem',
      },
      '2xl': {
        fontSize: '$2xl',
        lineHeight: '2rem',
      },
      '3xl': {
        fontSize: '$3xl',
        lineHeight: '2.25rem',
      },
      '4xl': {
        fontSize: '$4xl',
        lineHeight: '2.5rem',
      },
      '5xl': {
        fontSize: '$5xl',
        lineHeight: '100%',
      },
      '6xl': {
        fontSize: '$6xl',
        lineHeight: '100%',
      },
      '7xl': {
        fontSize: '$7xl',
        lineHeight: '100%',
      },
      '8xl': {
        fontSize: '$8xl',
        lineHeight: '100%',
      },
      '9xl': {
        fontSize: '$9xl',
        lineHeight: '100%',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
