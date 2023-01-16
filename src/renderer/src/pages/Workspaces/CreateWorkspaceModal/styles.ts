import { styled } from '../../../styles'

export const Container = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  gap: 8,

  footer: {
    marginTop: 16,

    display: 'flex',
    justifyContent: 'flex-end',
  },
})
