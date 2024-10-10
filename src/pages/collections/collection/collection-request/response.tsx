import { useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useAtom } from 'jotai'
import { LoaderCircle } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Editor } from '@monaco-editor/react'

import { controller, loadingAtom, responsesAtom } from './state'

type StatusType =
  | 'informational'
  | 'success'
  | 'redirection'
  | 'client-error'
  | 'server-error'
  | 'error'
  | 'unknown'

export function Response() {
  const { requestId } = useParams<{ requestId: string }>()

  const editorRef = useRef(null)

  const { theme } = useTheme()

  const [loading] = useAtom(loadingAtom)
  const [responses] = useAtom(responsesAtom)

  const response = responses[requestId as string]

  const startOfStatus = response?.response?.status.toString()[0]
  const statusType: StatusType = useMemo(() => {
    if (!startOfStatus) {
      return 'error'
    }

    if (startOfStatus === '1') {
      return 'informational'
    }

    if (startOfStatus === '2') {
      return 'success'
    }

    if (startOfStatus === '3') {
      return 'redirection'
    }

    if (startOfStatus === '4') {
      return 'client-error'
    }

    if (startOfStatus === '5') {
      return 'server-error'
    }

    return 'unknown'
  }, [startOfStatus])

  function handleCancelRequest() {
    controller.abort()
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

  const isJsonResponse =
    response?.response?.config.headers.Accept?.toString().includes(
      'application/json',
    )

  if (!loading && !response) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm">To view the response, send a request.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <LoaderCircle className="size-4 animate-spin" />

        <Button type="button" variant="outline" onClick={handleCancelRequest}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-[52px] items-center gap-2 p-2">
        <div
          className={cn(
            'h-7 px-2.5 flex items-center text-sm rounded-md font-bold text-white',
            statusType === 'informational' && 'bg-amber-500',
            statusType === 'success' && 'bg-green-500',
            statusType === 'redirection' && 'bg-blue-500',
            statusType === 'client-error' && 'bg-red-500',
            statusType === 'server-error' && 'bg-orange-500',
            statusType === 'error' && 'bg-red-500',
          )}
        >
          {response?.response?.status ?? 'Error'}
        </div>

        <div className="flex h-7 items-center rounded-md bg-muted px-2.5 text-sm font-semibold">
          {response?.time}ms
        </div>

        {/* <div className="flex h-7 items-center rounded-md bg-gray-100 px-2.5 text-sm font-semibold">
          1017 B
        </div> */}
      </header>

      <Separator orientation="horizontal" />

      {statusType === 'error' && (
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-sm">Error: Couldn&apos;t connect to server</p>
        </div>
      )}

      {isJsonResponse && (
        <div className="flex-1">
          <Editor
            defaultLanguage="json"
            value={JSON.stringify(response.response?.data, null, 2)}
            options={{
              readOnly: true,
              tabSize: 2,
              wordWrap: 'bounded',

              minimap: {
                enabled: false,
              },
            }}
            onMount={handleEditorDidMount}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
          />
        </div>
      )}
    </div>
  )
}
