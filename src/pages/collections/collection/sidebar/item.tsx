import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ChevronRight } from 'lucide-react'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'

import type { Request } from '.'

interface ItemProps {
  item: Request
  items: Request[]

  createRequest: (parentId?: string) => void
  createFolder: (parentId?: string) => void
  deleteRequest: (id: string) => void
  renameRequest: (request: Request) => void
}

export function Item({
  item,
  items,
  createRequest,
  createFolder,
  deleteRequest,
  renameRequest,
}: ItemProps) {
  const { collectionId, requestId } = useParams<{
    collectionId: string
    requestId: string
  }>()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const itemsToRender = items.filter((request) => request.parentId === item.id)

  const isFolder = item.type === 'FOLDER'

  function handleClick() {
    if (isFolder) {
      setIsOpen((prevState) => !prevState)
    } else {
      navigate(`/collections/${collectionId}/requests/${item.id}`)
    }
  }

  function handleCreateRequest() {
    createRequest(item.id)
  }

  function handleCreateFolder() {
    createFolder(item.id)
  }

  function handleDelete() {
    deleteRequest(item.id)
  }

  function handleRename() {
    renameRequest(item)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className={cn('flex flex-col', isOpen && 'pb-4')}>
          <div
            className={cn(
              'flex h-9 cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted/70',
              requestId === item.id && 'bg-muted',
            )}
            onClick={handleClick}
          >
            {item.type === 'FOLDER' && (
              <ChevronRight
                className={cn(
                  'size-3 transition-transform',
                  isOpen && 'rotate-90',
                )}
              />
            )}

            {item.type === 'REQUEST' && (
              <span
                className={cn(
                  'ml-1 w-8 text-[10px] font-bold leading-none',
                  item.method === 'GET' && 'text-blue-500',
                  item.method === 'POST' && 'text-green-500',
                  item.method === 'PUT' && 'text-amber-500',
                  item.method === 'PATCH' && 'text-orange-500',
                  item.method === 'DELETE' && 'text-red-500',
                )}
              >
                {item.method === 'DELETE' ? 'DEL' : item.method}
              </span>
            )}
            <span className="text-sm">{item.name}</span>
          </div>

          {isOpen && (
            <>
              {itemsToRender.length > 0 ? (
                <div className="flex flex-col pl-4">
                  {itemsToRender.map((itemToRender) => (
                    <Item
                      key={itemToRender.id}
                      item={itemToRender}
                      items={items}
                      createRequest={createRequest}
                      createFolder={createFolder}
                      deleteRequest={deleteRequest}
                      renameRequest={renameRequest}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <span className="text-sm text-muted-foreground">
                    No data found
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        {item.type === 'FOLDER' && (
          <>
            <ContextMenuItem onClick={handleCreateRequest}>
              Create request
            </ContextMenuItem>
            <ContextMenuItem onClick={handleCreateFolder}>
              Create folder
            </ContextMenuItem>
          </>
        )}

        <ContextMenuItem onClick={handleRename}>Rename</ContextMenuItem>

        <ContextMenuItem
          onClick={handleDelete}
          className="text-red-500 focus:bg-destructive/30 focus:text-red-500"
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
