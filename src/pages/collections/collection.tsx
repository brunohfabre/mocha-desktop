import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getGetRequestsQueryKey,
  useCreateRequest,
  useGetCollection,
  useGetRequests,
  useUpdateRequest,
} from '@/http/generated/api'
import { useOrganizationStore } from '@/stores/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import Editor from '@monaco-editor/react'
import { useQueryClient } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const requestSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
  bodyType: z.enum(['NONE', 'JSON']).optional(),
  body: z.string().optional(),
  authType: z.enum(['NONE', 'BEARER']).optional(),
  auth: z.string().optional(),
  headers: z.array(z.string()).optional(),
  params: z.array(z.string()).optional(),
  parentId: z.string().optional(),
})

type RequestData = z.infer<typeof requestSchema>

type MethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type BodyType = 'NONE' | 'JSON'
type AuthType = 'NONE' | 'BEARER'

type ResponseType = {
  status: string
}

export function Collection() {
  const navigate = useNavigate()
  const params = useParams<{ collectionId: string; requestId: string }>()

  const queryClient = useQueryClient()

  const requestForm = useForm<RequestData>({
    resolver: zodResolver(requestSchema),
  })

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

  const { mutateAsync: createRequest, isPending: createRequestIsPending } =
    useCreateRequest()
  const { mutateAsync: updateRequest, isPending: updateRequestIsPending } =
    useUpdateRequest()

  const requestData = requestsData?.requests.find(
    (request) => request.id === params.requestId
  )

  useEffect(() => {
    const item = requestsData?.requests.find(
      (item) => item.id === params.requestId
    )

    if (item) {
      requestForm.reset(item)
    }
  }, [requestForm, params.requestId, requestsData?.requests])

  async function handleUpdateRequest(data: RequestData) {
    try {
      const response = await updateRequest({
        organizationId: organizationSelected,
        collectionId: params.collectionId ?? '',
        requestId: params.requestId ?? '',
        data,
      })

      const newRequests = requestsData?.requests.map((request) =>
        request.id === params.requestId ? response.request : request
      )

      queryClient.setQueryData(
        getGetRequestsQueryKey(organizationSelected, params.collectionId ?? ''),
        { requests: newRequests }
      )
    } catch {
      toast.error('Error on update request')
    }
  }

  const updateRequestDebounce = debounce(handleUpdateRequest, 500)

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

  function updateLocalRequest({
    requestId,
    data,
  }: { requestId: string; data: RequestData }) {
    const newRequests = requestsData?.requests.map((request) =>
      request.id === requestId ? { ...request, ...data } : request
    )

    queryClient.setQueryData(
      getGetRequestsQueryKey(organizationSelected, params.collectionId ?? ''),
      { requests: newRequests }
    )
  }

  if (collectionIsLoading || requestsIsLoading) {
    return <div>is loading</div>
  }

  console.log(requestData)

  return (
    <div className="flex-1 flex">
      <div className="w-64 flex flex-col">
        <header className="flex p-2 items-center gap-2">
          <span>{collectionData?.collection?.name}</span>

          {updateRequestIsPending && (
            <Loader2 className="animate-spin size-4" />
          )}
        </header>

        <Separator orientation="horizontal" />

        <Button
          type="button"
          onClick={handleCreateRequest}
          disabled={createRequestIsPending}
        >
          {createRequestIsPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            'Create request'
          )}
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
                <span>{request.method}</span>
                {request.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <Separator orientation="vertical" />

      {params.requestId && (
        <>
          <div className="flex-1 flex flex-col">
            <div className="flex p-2 gap-2">
              <Controller
                control={requestForm.control}
                name="method"
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onValueChange={(method: MethodType) => {
                      onChange(method)

                      handleUpdateRequest({
                        method,
                      })
                      updateLocalRequest({
                        requestId: params.requestId ?? '',
                        data: {
                          method,
                        },
                      })
                    }}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                control={requestForm.control}
                name="url"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <Input
                    placeholder="Route"
                    value={value}
                    onChange={(event) => {
                      onChange(event.target.value)
                      updateRequestDebounce({ url: event.target.value })
                    }}
                    {...fieldProps}
                  />
                )}
              />
              <Button>Send</Button>
            </div>

            <Separator orientation="horizontal" />

            <Tabs defaultValue="body" className="flex flex-col flex-1">
              <div>
                <TabsList>
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="auth">Auth</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="params">Params</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="body" className="flex flex-col flex-1">
                <div className="flex">
                  <Controller
                    control={requestForm.control}
                    name="bodyType"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        onValueChange={(bodyType: BodyType) => {
                          onChange(bodyType)

                          handleUpdateRequest({
                            bodyType,
                          })
                          updateLocalRequest({
                            requestId: params.requestId ?? '',
                            data: {
                              bodyType,
                            },
                          })
                        }}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Body type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="NONE">NONE</SelectItem>
                          <SelectItem value="JSON">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {requestData?.bodyType === 'JSON' && (
                  <div className="flex-1">
                    <Controller
                      control={requestForm.control}
                      name="body"
                      render={({ field: { value, onChange } }) => (
                        <Editor
                          defaultLanguage="json"
                          className="size-full"
                          value={value}
                          onChange={(body) => {
                            onChange(body)
                            updateRequestDebounce({ body })
                          }}
                        />
                      )}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="auth">
                AUTH - Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Labore natus veniam inventore. Dicta vel dolor accusamus amet ut
                corporis neque consectetur nostrum. Inventore voluptate, maxime
                corporis vel exercitationem dicta error.
              </TabsContent>

              <TabsContent value="headers">
                HEADERS - Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Labore natus veniam inventore. Dicta vel dolor accusamus
                amet ut corporis neque consectetur nostrum. Inventore voluptate,
                maxime corporis vel exercitationem dicta error.
              </TabsContent>

              <TabsContent value="params">
                PARAMS - Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Labore natus veniam inventore. Dicta vel dolor accusamus
                amet ut corporis neque consectetur nostrum. Inventore voluptate,
                maxime corporis vel exercitationem dicta error.
              </TabsContent>
            </Tabs>
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
