import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Organization = {
  id: string
  name: string
}

type Store = {
  organization: Organization | null
  setOrganization: (organization: Organization | null) => void
}

export const useOrganizationStore = create(
  persist<Store>(
    (set) => ({
      organization: null,

      setOrganization: (organization: Organization | null) =>
        set(() => ({
          organization,
        })),
    }),
    {
      name: 'mocha.organization',
    },
  ),
)
