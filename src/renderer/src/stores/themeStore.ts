import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

type Store = {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create(
  persist<Store>(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-store',
    },
  ),
)
