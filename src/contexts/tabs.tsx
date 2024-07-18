import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type TabType = {
  id: string
  name: string
  route: string
  pinned: boolean
}

interface TabsContextData {
  tabs: TabType[]
  selectedTab: TabType | null
  addTab: (tab: TabType) => void
  removeTab: (id: string) => void
  selectTab: (tab: TabType | null) => void
}

const TabsContext = createContext({} as TabsContextData)

export function TabsContextProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const [tabs, setTabs] = useState<TabType[]>([])
  const [selectedTab, setSelectedTab] = useState<TabType | null>(null)

  function addTab(tab: TabType) {
    const findTab = tabs.find((item) => item.route === tab.route)

    if (findTab) {
      setSelectedTab(findTab)

      return
    }

    setTabs((prevState) => [...prevState, tab])
    setSelectedTab(tab)
  }

  function removeTab(id: string) {
    if (id === selectedTab?.id) {
      const findIndex = tabs.findIndex((item) => item.id === id)

      if (tabs.length === 1) {
        navigate('/')
      } else {
        if (tabs.length - 1 === findIndex) {
          const tab = tabs[findIndex - 1]

          setSelectedTab(tab)
          navigate(tab.route)
        } else {
          const tab = tabs[findIndex + 1]

          setSelectedTab(tab)
          navigate(tab.route)
        }
      }
    }

    setTabs((prevState) => prevState.filter((item) => item.id !== id))
  }

  function selectTab(tab: TabType | null) {
    setSelectedTab(tab)
  }

  return (
    <TabsContext.Provider
      value={{ tabs, selectedTab, addTab, removeTab, selectTab }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export function useTabs() {
  const context = useContext(TabsContext)

  return context
}
