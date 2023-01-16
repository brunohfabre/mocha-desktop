import { Outlet } from 'react-router-dom'

import { PageHeader } from '../../components/PageHeader'
import { Container } from './styles'

export function InternalLayout() {
  return (
    <Container>
      <PageHeader spacing showWorkspace={false} />

      <Outlet />
    </Container>
  )
}
