import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    border: 0,
    boxSizing: 'border-box',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Inter',
    fontWeight: 400,
  },
})
