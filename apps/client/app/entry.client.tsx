/**
 * By default, React Router will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx react-router reveal` ✨
 * For more information, see https://reactrouter.com/explanation/special-files#entryclienttsx
 */

import { HydratedRouter } from 'react-router/dom'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import createEmotionCache from './providers/MuiThemeProvider/createEmotionCache'
// import { CacheProvider } from '@emotion/react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from './providers/MuiThemeProvider/theme'
import MuiThemeProvider from './providers/MuiThemeProvider'

// const cache = createEmotionCache()

// startTransition(() => {
//   hydrateRoot(
//     document,
//     <StrictMode>
//       <CacheProvider value={cache}>
//         <ThemeProvider theme={darkTheme}>
//           <HydratedRouter />
//         </ThemeProvider>
//       </CacheProvider>
//     </StrictMode>
//   )
// })
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  )
})
