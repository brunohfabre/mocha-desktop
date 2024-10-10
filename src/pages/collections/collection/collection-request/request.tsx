import { useEffect, useRef } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useAtom } from 'jotai'
import { X } from 'lucide-react'
import { z } from 'zod'

import { useTheme } from '@/components/theme-provider'
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
import { api } from '@/lib/api'
import { debounce } from '@/utils/debounce'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@monaco-editor/react'
import { useQueryClient } from '@tanstack/react-query'

import type { Collection, Request as RequestType } from '../sidebar'
import { updateLoadingAtom } from '../state'
import { controller, loadingAtom, responsesAtom } from './state'

const formSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  url: z.string(),

  bodyType: z.enum(['NONE', 'JSON']),
  body: z.string().nullish(),

  authType: z.enum(['NONE', 'BEARER']),
  auth: z.record(z.string(), z.string().optional()).nullish(),

  headers: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),

  params: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
})

type FormData = z.infer<typeof formSchema>

interface RequestProps {
  request: RequestType
}

export function Request({ request }: RequestProps) {
  const editorRef = useRef(null)

  const { collectionId, requestId } = useParams<{
    collectionId: string
    requestId: string
  }>()

  const { theme } = useTheme()

  const queryClient = useQueryClient()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const headersField = useFieldArray({
    control: form.control,
    name: 'headers',
  })
  const paramsField = useFieldArray({
    control: form.control,
    name: 'params',
  })

  const bodyType = useWatch({ control: form.control, name: 'bodyType' })
  const authType = useWatch({ control: form.control, name: 'authType' })

  const [, setLoading] = useAtom(loadingAtom)
  const [, setResponses] = useAtom(responsesAtom)
  const [, setUpdateLoading] = useAtom(updateLoadingAtom)

  useEffect(() => {
    form.reset(request as any)
  }, [form, request])

  async function updateRequest(data: Record<string, any>) {
    try {
      setUpdateLoading(true)

      await api.put(`/collections/${collectionId}/requests/${requestId}`, data)

      queryClient.setQueryData(
        ['collections', collectionId],
        (prevState: Collection) => ({
          ...prevState,
          requests: prevState.requests.map((item) =>
            item.id === requestId ? { ...item, ...data } : item,
          ),
        }),
      )
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleUpdateRequest = debounce(updateRequest, 500)

  function handleUpdateMethod(data: Record<string, any>) {
    handleUpdateRequest(data)

    queryClient.setQueryData(
      ['collections', collectionId],
      (prevState: Collection) => ({
        ...prevState,
        requests: prevState.requests.map((item) =>
          item.id === requestId ? { ...item, ...data } : item,
        ),
      }),
    )
  }

  function sendRequest(data: FormData) {
    setLoading(true)

    const { method, url, body, headers, params, authType, auth } = data

    const headersObject: Record<string, any> = {}
    const paramsObject: Record<string, any> = {}

    headers.forEach((header) => {
      headersObject[header.name] = header.value
    })

    params.forEach((param) => {
      paramsObject[param.name] = param.value
    })

    if (authType === 'BEARER') {
      headersObject.authorization = `Bearer ${auth?.token}`
    }

    const startTime = Date.now()

    axios({
      method,
      url,
      signal: controller.signal,
      data: body ? JSON.parse(body) : undefined,
      headers: headersObject,
      params: paramsObject,
    })
      .then((data) => {
        const time = Date.now() - startTime

        setResponses((prevState) => ({
          ...prevState,
          [request.id]: { response: data, time },
        }))
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const time = Date.now() - startTime

          if (error.code === 'ERR_NETWORK') {
            setResponses((prevState) => ({
              ...prevState,
              [request.id]: { response: null, time },
            }))
            return
          }

          setResponses((prevState) => ({
            ...prevState,
            [request.id]: { response: error.response as AxiosResponse, time },
          }))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor

    window.addEventListener('resize', () => {
      editor.layout({
        width: 'auto',
        height: 'auto',
      })
    })
  }

  return (
    <div className="flex flex-1 flex-col">
      <form
        className="flex gap-2 p-2"
        onSubmit={form.handleSubmit(sendRequest)}
      >
        <Controller
          control={form.control}
          name="method"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value)

                handleUpdateMethod({ method: value })
              }}
            >
              <SelectTrigger className="w-min min-w-24">
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
          control={form.control}
          name="url"
          render={({ field }) => (
            <Input
              placeholder="Enter URL"
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value)
                handleUpdateRequest({ url: event.target.value })
              }}
            />
          )}
        />

        <Button type="submit">Send</Button>
      </form>

      <Separator orientation="horizontal" />

      <Tabs defaultValue="body" className="flex flex-1 flex-col">
        <div className="p-2">
          <TabsList>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="params">Params</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="body" className="m-0" asChild>
          <div className="flex flex-1 flex-col">
            <div className="flex-1">
              {bodyType === 'JSON' && (
                <Controller
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <Editor
                      defaultLanguage="json"
                      value={field.value === null ? '' : field.value}
                      onChange={(value) => {
                        field.onChange(value)

                        handleUpdateRequest({
                          body: value,
                        })
                      }}
                      options={{
                        tabSize: 2,
                        wordWrap: 'bounded',

                        minimap: {
                          enabled: false,
                        },
                      }}
                      onMount={handleEditorDidMount}
                      theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                    />
                  )}
                />
              )}
            </div>

            <div className="p-2">
              <Controller
                control={form.control}
                name="bodyType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)

                      handleUpdateRequest({
                        bodyType: value,
                      })

                      if (value === 'NONE') {
                        form.setValue('body', '')
                      }
                    }}
                  >
                    <SelectTrigger className="w-min min-w-20">
                      <SelectValue placeholder="Body type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="JSON">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="auth" className="m-0" asChild>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 px-2 py-6">
              {authType === 'BEARER' && (
                <Controller
                  control={form.control}
                  name="auth.token"
                  render={({ field }) => (
                    <Input
                      placeholder="Token"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.value)

                        handleUpdateRequest({
                          auth: {
                            token: event.target.value,
                          },
                        })
                      }}
                    />
                  )}
                />
              )}
            </div>

            <div className="p-2">
              <Controller
                control={form.control}
                name="authType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)

                      handleUpdateRequest({
                        authType: value,
                      })

                      if (value === 'NONE') {
                        form.setValue('auth', {})
                      }
                    }}
                  >
                    <SelectTrigger className="w-min min-w-24">
                      <SelectValue placeholder="Auth type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="BEARER">Bearer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="headers" className="m-0" asChild>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => {
                  headersField.append({ name: '', value: '' })

                  const data = form.getValues()

                  updateRequest({
                    headers: data.headers,
                  })
                }}
              >
                + Header
              </Button>
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
              {headersField.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Controller
                    name={`headers.${index}.name`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        className="flex-1"
                        placeholder="Name"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.value)

                          const data = form.getValues()
                          handleUpdateRequest({
                            headers: data.headers.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, name: event.target.value }
                                : item,
                            ),
                          })
                        }}
                      />
                    )}
                  />

                  <Controller
                    name={`headers.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        className="flex-1"
                        placeholder="Value"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.value)

                          const data = form.getValues()
                          handleUpdateRequest({
                            headers: data.headers.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, value: event.target.value }
                                : item,
                            ),
                          })
                        }}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      headersField.remove(index)

                      const data = form.getValues()

                      updateRequest({
                        headers: data.headers,
                      })
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="params" className="m-0" asChild>
          <div className="flex flex-1 flex-col gap-4 p-2">
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => {
                  paramsField.append({ name: '', value: '' })

                  const data = form.getValues()

                  updateRequest({
                    params: data.params,
                  })
                }}
              >
                + Param
              </Button>
            </div>

            <div className="flex flex-col gap-2 overflow-auto">
              {paramsField.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Controller
                    name={`params.${index}.name`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        className="flex-1"
                        placeholder="Name"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.value)

                          const data = form.getValues()
                          handleUpdateRequest({
                            params: data.params.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, name: event.target.value }
                                : item,
                            ),
                          })
                        }}
                      />
                    )}
                  />

                  <Controller
                    name={`params.${index}.value`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        className="flex-1"
                        placeholder="Value"
                        value={field.value}
                        onChange={(event) => {
                          field.onChange(event.target.value)

                          const data = form.getValues()
                          handleUpdateRequest({
                            params: data.params.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, value: event.target.value }
                                : item,
                            ),
                          })
                        }}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      paramsField.remove(index)

                      const data = form.getValues()

                      updateRequest({
                        params: data.params,
                      })
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
