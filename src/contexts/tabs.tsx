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
  addTab: (tab: TabType) => void
  removeTab: (tab: TabType) => void
  selectTab: (tab: TabType) => void
}

const TabsContext = createContext({} as TabsContextData)

export function TabsContextProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  const [tabs, setTabs] = useState<TabType[]>([])

  function addTab(tab: TabType) {
    const findTab = tabs.find((item) => item.route === tab.route)

    if (findTab) {
      navigate(findTab.route)

      return
    }

    setTabs((prevState) => [...prevState, tab])
    navigate(tab.route)
  }

  function removeTab(tab: TabType) {
    if (tab.route === location.pathname) {
      const findIndex = tabs.findIndex((item) => item.id === tab.id)

      if (tabs.length === 1) {
        navigate('/')
      } else {
        if (tabs.length - 1 === findIndex) {
          const tab = tabs[findIndex - 1]

          navigate(tab.route)
        } else {
          const tab = tabs[findIndex + 1]

          navigate(tab.route)
        }
      }
    }

    setTabs((prevState) => prevState.filter((item) => item.id !== tab.id))
  }

  function selectTab(tab: TabType) {
    navigate(tab.route)
  }

  return (
    <TabsContext.Provider value={{ tabs, addTab, removeTab, selectTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export function useTabs() {
  const context = useContext(TabsContext)

  return context
}
