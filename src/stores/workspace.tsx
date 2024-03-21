import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Store {
  workspaceSelected: string
  selectWorkspace: (workspaceId: string) => void
}

export const useWorkspaceStore = create(
  persist<Store>(
    (set) => ({
      workspaceSelected: 'null',
      selectWorkspace: (workspaceId) =>
        set(() => ({
          workspaceSelected: workspaceId,
        })),
    }),
    {
      name: 'workspace',
    },
  ),
)
