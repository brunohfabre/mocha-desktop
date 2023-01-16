import { styled } from '../../styles'

export const Container = styled('div', {
  flex: 1,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: 32,

  gap: 24,

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    maxWidth: 288,
  },
})
