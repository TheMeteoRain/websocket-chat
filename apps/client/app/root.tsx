import { ApolloHydrationHelper } from '@apollo/client-integration-react-router'
import { styled } from '@mui/material/styles'
import React from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
  type MetaFunction,
} from 'react-router'
import { Route } from './+types/root'
import { AuthProvider } from './hooks'
import { ApolloClientProvider } from './providers/ApolloClientProvider'
import MuiThemeProvider from './providers/MuiThemeProvider'
import getCookieValue from './utils/getCookieValue'

const DivStyled = styled('div')(({ theme }) =>
  theme.unstable_sx({
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    overflow: 'hidden',
  })
)

export const meta: MetaFunction = () => [
  {
    title: 'Rally',
  },
]

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <Meta />
        <Links />
        <meta name='emotion-insertion-point' content='' />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}

const THEME_COOKIE_KEY = 'theme'

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie') || ''
  const authorization = getCookieValue(cookieHeader, 'token')
  const theme = getCookieValue(cookieHeader, THEME_COOKIE_KEY) as
    | 'light'
    | 'dark'
    | undefined

  return {
    authorization,
    theme,
  }
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { authorization, theme } = loaderData

  return (
    <MuiThemeProvider themeOverwrite={theme} modeStorageKey={THEME_COOKIE_KEY}>
      <ApolloClientProvider authorization={authorization}>
        <AuthProvider>
          <ApolloHydrationHelper>
            <DivStyled>
              <Outlet />
            </DivStyled>
          </ApolloHydrationHelper>
        </AuthProvider>
      </ApolloClientProvider>
    </MuiThemeProvider>
  )
}
