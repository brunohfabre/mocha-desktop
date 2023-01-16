import { styled } from '../../../styles'

export const Container = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  gap: 8,

  footer: {
    marginTop: 24,

    display: 'flex',
    justifyContent: 'flex-end',
  },
})
