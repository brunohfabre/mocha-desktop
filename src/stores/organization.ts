import { create } from 'zustand'

type Store = {
  organizationSelected: string
  selectOrganization: (organizationId: string) => void
}

export const useOrganizationStore = create<Store>((set) => ({
  organizationSelected: '',
  selectOrganization: (organizationId: string) =>
    set(() => ({
      organizationSelected: organizationId,
    })),
}))
