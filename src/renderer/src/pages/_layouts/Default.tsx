import { Outlet } from 'react-router-dom'

import { PageHeader } from '../../components/PageHeader'
import { Container } from './styles'

export function DefaultLayout() {
  return (
    <Container>
      <PageHeader spacing />

      <Outlet />
    </Container>
  )
}
