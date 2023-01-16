import { styled } from '../../styles'

export const Container = styled('div', {
  '-webkit-app-region': 'drag',

  display: 'flex',
  alignItems: 'center',

  height: 48,

  padding: '0 16px',
})

export const WorkspacesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
})

export const ProfileContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,

  marginLeft: 'auto',

  cursor: 'pointer',
})
