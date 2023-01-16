import { keyframes, styled } from '../../styles'

const placeholderShimmer = keyframes({
  '0%': {
    backgroundPosition: '-1000px 0',
  },
  '100%': {
    backgroundPosition: '1000px 0',
  },
})

export const BaseShimmer = styled('div', {
  flex: 1,
  background: '$gray200',
  backgroundImage: `
    linear-gradient(
      to right,
      $gray200 0%,
      $gray300 20%,
      $gray200 40%,
      $gray200 100%
    )
  `,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '2000px 1000px',
  display: 'inline-block',
  position: 'relative',

  animationDuration: '1s',
  animationFillMode: 'forwards',
  animationIterationCount: 'infinite',
  animationName: `${placeholderShimmer}`,
  animationTimingFunction: 'linear',
})
