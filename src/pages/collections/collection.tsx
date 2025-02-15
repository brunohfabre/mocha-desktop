import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  getGetRequestsQueryKey,
  useCreateRequest,
  useGetCollection,
  useGetRequests,
} from '@/http/generated/api'
import { useOrganizationStore } from '@/stores/organization'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

type ResponseType = {
  status: string
}

export function Collection() {
  const navigate = useNavigate()
  const params = useParams<{ collectionId: string; requestId: string }>()

  const queryClient = useQueryClient()

  const organizationSelected = useOrganizationStore(
    (state) => state.organizationSelected
  )

  const [responses, setResponses] = useState<Record<string, ResponseType>>({})

  const { data: collectionData, isLoading: collectionIsLoading } =
    useGetCollection(organizationSelected, params.collectionId ?? '')

  const { data: requestsData, isLoading: requestsIsLoading } = useGetRequests(
    organizationSelected,
    params.collectionId ?? ''
  )

  const { mutateAsync: createRequest, isPending } = useCreateRequest()

  async function handleCreateRequest() {
    try {
      const response = await createRequest({
        organizationId: organizationSelected,
        collectionId: params.collectionId ?? '',
      })

      queryClient.invalidateQueries({
        queryKey: getGetRequestsQueryKey(
          organizationSelected,
          params.collectionId ?? ''
        ),
      })

      navigate(
        `/collections/${params.collectionId}/requests/${response.request.id}`
      )
    } catch {
      toast.error('Error on create request')
    }
  }

  if (collectionIsLoading || requestsIsLoading) {
    return <div>is loading</div>
  }

  return (
    <div className="flex-1 flex">
      <div className="w-64 flex flex-col">
        <header className="flex p-2">
          <span>{collectionData?.collection?.name}</span>
        </header>

        <Separator orientation="horizontal" />

        <Button
          type="button"
          onClick={handleCreateRequest}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Create request'}
        </Button>

        <Separator orientation="horizontal" />

        <div className="flex flex-col">
          {requestsData?.requests.map((request) => (
            <Button
              key={request.id}
              type="button"
              variant={params.requestId === request.id ? 'secondary' : 'ghost'}
              asChild
              className="flex justify-start"
            >
              <Link
                to={`/collections/${params.collectionId}/requests/${request.id}`}
              >
                {request.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <Separator orientation="vertical" />

      {params.requestId && (
        <>
          <div className="flex-1">
            <p>{JSON.stringify(params, null, 2)}</p>
          </div>

          <Separator orientation="vertical" />

          <div className="flex-1">
            {!!responses[params.requestId] && 'has response'}
          </div>
        </>
      )}
    </div>
  )
}
