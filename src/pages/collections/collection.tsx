import { useParams } from 'react-router-dom'

export function Collection() {
  const params = useParams()

  return <div>collection - {JSON.stringify(params)}</div>
}
