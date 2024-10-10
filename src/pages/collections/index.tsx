import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Ellipsis, LoaderCircle } from 'lucide-react'

import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { useOrganizationStore } from '@/stores/organization-store'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { CollectionForm } from './collection-form'

export type Collection = {
  id: string
  name: string
}

export function Collections() {
  const navigate = useNavigate()

  const organization = useOrganizationStore((state) => state.organization)

  const queryClient = useQueryClient()

  const [modalVisible, setModalVisible] = useState(false)
  const [collectionToUpdate, setCollectionToUpdate] =
    useState<Collection | null>(null)
  const [loading, setLoading] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await api.get<{ collections: Collection[] }>(
        `/organizations/${organization?.id}/collections`,
      )

      return response.data.collections
    },
  })

  async function deleteCollection(id: string) {
    try {
      setLoading(true)

      await api.delete(`/organizations/${organization?.id}/collections/${id}`)

      queryClient.setQueryData(['collections'], (prevState: Collection[]) =>
        prevState.filter((item) => item.id !== id),
      )
    } finally {
      setLoading(false)
    }
  }

  if (!data && isPending) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    )
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <LoaderCircle className="animate-spin" />
        </div>
      )}

      <CollectionForm
        open={modalVisible}
        onOpenChange={() => {
          setModalVisible(false)
          setCollectionToUpdate(null)
        }}
        collectionToUpdate={collectionToUpdate}
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <header className="flex justify-between">
          <p className="text-lg font-semibold">Collections</p>

          <Button type="button" onClick={() => setModalVisible(true)}>
            + Collection
          </Button>
        </header>

        {data?.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {data?.map((item) => (
              <Card
                key={item.id}
                className="flex cursor-pointer items-center p-3 hover:bg-muted/50"
                onClick={() => navigate(`/collections/${item.id}`)}
              >
                <div className="flex-1 pl-1">
                  <span>{item.name}</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size="icon" variant="outline">
                      <Ellipsis className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.stopPropagation()

                        setCollectionToUpdate(item)
                        setModalVisible(true)
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.stopPropagation()

                        deleteCollection(item.id)
                      }}
                      className="text-red-500 focus:bg-destructive/30 focus:text-red-500"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
