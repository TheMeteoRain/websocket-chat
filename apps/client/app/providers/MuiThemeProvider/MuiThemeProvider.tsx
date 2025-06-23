import CssBaseline from '@mui/material/CssBaseline'
import {
  createTheme,
  ThemeProvider,
  ThemeProviderProps,
} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { GlobalStyles } from '@mui/material'
import Cookies from 'js-cookie'
import React from 'react'
import getDesignTokens, { darkTheme, lightTheme } from './theme'
import { useColorScheme } from '@mui/material/styles'

export type ThemeModes = 'dark' | 'light'

export type ThemeContextProps = {
  setThemeMode: (mode?: ThemeModes) => void
  themeMode: ThemeModes
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
)

const storageManager: StorageManager = ({ key }) => ({
  get(defaultValue) {
    return Cookies.get(key) || defaultValue
  },
  set(value) {
    Cookies.set(key, value)
  },
  subscribe(handler) {
    return handler
  },
})

const DEFAULT_THEME: ThemeModes = 'dark'

export interface MuiThemeProviderProps extends Partial<ThemeProviderProps> {
  themeOverwrite?: ThemeModes
}

export const MuiThemeProvider: React.FC<MuiThemeProviderProps> = (props) => {
  const { children, themeOverwrite, ...rest } = props
  // TODO: issue with SSR, cant use useMediaQuery for if the overwrite is system
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const systemDefault = themeOverwrite ? themeOverwrite : DEFAULT_THEME
  const [themeMode, setThemeMode] = React.useState(systemDefault)
  const handleThemeChange = (mode?: ThemeModes) => {
    const resolvedTheme = mode ? mode : systemDefault
    setThemeMode(resolvedTheme)
  }

  const theme = React.useMemo(() => {
    return themeMode === 'dark' ? darkTheme : lightTheme
  }, [themeMode])

  return (
    <ThemeContext.Provider
      value={{
        setThemeMode: handleThemeChange,
        themeMode,
      }}
    >
      <ThemeProvider
        defaultMode={DEFAULT_THEME}
        {...rest}
        theme={theme}
        storageManager={storageManager}
      >
        <CssBaseline />
        <GlobalStyles
          styles={{
            // ':root': {
            //   '--link-color-main': '#1887C7',
            //   '--link-color-primary': '#172671',
            //   '--link-color-secondary': '#12154C',
            // },
            a: {
              color: theme.palette.link.main,
              textDecoration: 'none',
            },
            'a:visited': {
              color: theme.palette.link.main,
            },
            'a:hover': {
              color: theme.palette.link.light,
              textDecoration: 'underline',
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  const { setMode } = useColorScheme()

  const handleTheme = (mode: ThemeModes) => {
    setMode(mode)
    context.setThemeMode(mode)
  }

  const toggleTheme = () => {
    const mode = context.themeMode === 'dark' ? 'light' : 'dark'
    setMode(mode)
    context.setThemeMode(mode)
  }

  return { ...context, setThemeMode: handleTheme, toggleTheme }
}

export default MuiThemeProvider
