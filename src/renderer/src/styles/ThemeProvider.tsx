import { ReactNode } from 'react'

import { createTheme } from '.'
import { useThemeStore } from '../stores/themeStore'
import { colors } from './tokens/colors'

type ThemeProviderProps = {
  children: ReactNode
}

const lightTheme = createTheme({
  colors,
})

const darkTheme = createTheme({
  colors: {
    ...colors,

    gray50: colors.gray900,
    gray100: colors.gray800,
    gray200: colors.gray700,
    gray300: colors.gray600,
    gray400: colors.gray500,
    gray500: colors.gray400,
    gray600: colors.gray300,
    gray700: colors.gray200,
    gray800: colors.gray100,
    gray900: colors.gray50,

    violet100: colors.violet900,
    violet200: colors.violet800,
    violet300: colors.violet700,
    violet400: colors.violet600,
    violet500: colors.violet500,
    violet600: colors.violet400,
    violet700: colors.violet300,
    violet800: colors.violet200,
    violet900: colors.violet100,

    red100: colors.red900,
    red200: colors.red800,
    red300: colors.red700,
    red400: colors.red600,
    red500: colors.red500,
    red600: colors.red400,
    red700: colors.red300,
    red800: colors.red200,
    red900: colors.red100,

    appBackground: colors.gray900,
    shape: colors.gray800,
    shapeBorder: colors.gray800,

    textTitle: colors.gray50,
  },
})

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div className={theme === 'light' ? lightTheme : darkTheme}>{children}</div>
  )
}
