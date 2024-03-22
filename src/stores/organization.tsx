import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Store {
  organizationSelected: string
  selectOrganization: (organizationId: string) => void
}

export const useOrganizationStore = create(
  persist<Store>(
    (set) => ({
      organizationSelected: 'null',
      selectOrganization: (organizationId) =>
        set(() => ({
          organizationSelected: organizationId,
        })),
    }),
    {
      name: 'organization',
    },
  ),
)
