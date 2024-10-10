import { useParams } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'
import { useQueryClient } from '@tanstack/react-query'

import type { Collection } from '../sidebar'
import { Request } from './request'
import { Response } from './response'

export function CollectionRequest() {
  const { collectionId, requestId } = useParams<{
    collectionId: string
    requestId: string
  }>()

  const queryClient = useQueryClient()

  const collection = queryClient.getQueryData<Collection>([
    'collections',
    collectionId,
  ])
  const request = collection?.requests.find((item) => item.id === requestId)

  if (!request) {
    return <></>
  }

  return (
    <div className="flex flex-1">
      <Request request={request} />

      <Separator orientation="vertical" />

      <Response />
    </div>
  )
}
