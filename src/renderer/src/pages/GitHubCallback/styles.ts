import { keyframes, styled } from "../../styles";

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  justifyContent: 'center',
  gap: 32,

  svg: {
    maxWidth: 64,
    maxHeight: 64
  }
})

const animation = keyframes({
  '0%, 100%': {
    transform: 'translateY(-25%)',
    animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
  },
  '50%': {
    transform: 'translateY(0)',
    animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  }
})

export const GitHubIconContainer = styled('div', {
  animation: `${animation} 1s infinite`
})