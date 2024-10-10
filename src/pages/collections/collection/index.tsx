import { Outlet, useParams } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { useQuery } from '@tanstack/react-query'

import { Sidebar } from './sidebar'

export function Collection() {
  const { collectionId, requestId } = useParams<{
    collectionId: string
    requestId: string
  }>()

  const organization = useOrganizationStore((state) => state.organization)

  const { data, isPending } = useQuery({
    queryKey: ['collections', collectionId],
    queryFn: async () => {
      const response = await api.get(
        `/organizations/${organization?.id}/collections/${collectionId}`,
      )

      return response.data.collection
    },
  })

  if (!data && isPending) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
        <LoaderCircle className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full antialiased">
      <Sidebar />

      <Separator orientation="vertical" />

      <Outlet />

      {!requestId && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm">To start, select a request.</p>
        </div>
      )}
    </div>
  )
}
