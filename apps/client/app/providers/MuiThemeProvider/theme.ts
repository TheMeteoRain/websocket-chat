import { createTheme, ThemeOptions } from '@mui/material/styles'

type CustomTheme = {
  palette: ThemeOptions['palette']
  components?: ThemeOptions['components']
}

const lightThemeOptions: CustomTheme = {
  palette: {
    mode: 'light',
    text: {
      primary: '#0d0c0c',
      secondary: '#f3f2f2',
    },
    background: {
      default: '#faf5f5',
      paper: '#faf5f5',
    },
    primary: {
      main: '#6a2a25',
    },
    secondary: {
      main: '#e57a71',
    },
    accent: {
      main: '#d61b0a',
    },
    link: {
      light: '#60b9ec',
      main: '#1887C7',
      dark: '#136c9f',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          variants: [
            {
              // light theme appbar doesn't by default use correct background color for outlined variant
              props: { variant: 'outlined' },
              style({ theme }) {
                return {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                }
              },
            },
          ],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
  },
}

const darkThemeOptions: CustomTheme = {
  palette: {
    mode: 'dark',
    text: {
      primary: '#f3f2f2',
      secondary: '#0d0c0c',
    },
    background: {
      default: '#0a0505',
      paper: '#0a0505',
    },
    primary: {
      main: '#da9a95',
    },
    secondary: {
      main: '#8e241a',
    },
    accent: {
      main: '#f53a29',
    },
    link: {
      light: '#bbe1f7',
      main: '#60b9ec',
      dark: '#1887C7',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
  },
  // MuiInputBase: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       color: 'red',
  //       backgroundColor: 'white',
  //     }),
  //   },
  // MuiTextField: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       color: 'red',
  //       backgroundColor: 'red',
  //     }),
  //   },
  // },
}

export const getDesignTokens = (mode: 'light' | 'dark' = 'light') => {
  const customTheme = mode === 'light' ? lightThemeOptions : darkThemeOptions

  return createTheme({
    colorSchemes: {
      dark: true,
    },
    palette: customTheme.palette,
    components: {
      ...customTheme.components,
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    typography: {
      fontFamily: 'Inter, Roboto, sans-serif',
    },
  })
}

export const darkTheme = getDesignTokens('dark')
export const lightTheme = getDesignTokens('light')

export default getDesignTokens
