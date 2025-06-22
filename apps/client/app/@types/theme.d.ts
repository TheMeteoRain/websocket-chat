import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary']
    link: Palette['primary']
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
    link?: PaletteOptions['primary']
  }
}
