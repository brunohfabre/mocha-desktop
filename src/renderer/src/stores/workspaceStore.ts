import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Workspace = {
  id: string
  name: string
}

type Store = {
  workspace: Workspace | null
  selectWorkspace: (workspace: Workspace | null) => void
}

export const useWorkspaceStore = create(
  persist<Store>(
    (set) => ({
      workspace: null,
      selectWorkspace: (workspace: Workspace | null) =>
        set(() => ({
          workspace
        })),
    }),
    {
      name: 'workspace-store',
    },
  ),
)
