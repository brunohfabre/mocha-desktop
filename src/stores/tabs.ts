import { create } from 'zustand'

type TabType = {
  id: string
  label: string
  page: string
  reference: string
}

type Store = {
  tabs: TabType[]
  tabSelected: string
  addTab: (data: TabType) => void
  removeTab: (id: string) => void
  selectTab: (id: string) => void
}

export const useTabs = create<Store>((set) => ({
  tabs: [],
  tabSelected: '',
  addTab: (data: TabType) =>
    set((state) => ({
      tabs: [...state.tabs, data],
    })),
  removeTab: (id: string) =>
    set((state) => ({
      tabs: state.tabs.filter((tab) => tab.id !== id),
    })),
  selectTab: (id: string) =>
    set(() => ({
      tabSelected: id,
    })),
}))
