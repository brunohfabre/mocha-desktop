import { styled } from '../../styles'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  padding: 16,
  gap: 16,

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footer: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
})

export const Content = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
})
