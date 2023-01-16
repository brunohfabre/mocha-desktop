import { styled } from '../../styles'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 992,
  width: '100%',
  margin: '0 auto',
  padding: '8px 16px 56px',
  alignItems: 'center',
  justifyContent: 'space-between',

  img: {
    alignSelf: 'start',
    width: 32,
  },
})

export const Content = styled('div', {
  width: 320,
  alignSelf: 'center',

  display: 'flex',
  flexDirection: 'column',

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 32,

    '> button': {
      marginTop: 16,
    },
  },
})
