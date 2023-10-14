import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ErrorBoundary, LinearWithValueLabel } from '@src/components'
import { HeaderContainer } from '@src/containers'
import { AuthProvider, useAuth } from '@src/hooks/useAuth'
import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  RouteProps,
} from 'react-router-dom'
import { ApolloClientProvider } from './providers'

const Home = React.lazy(() => {
  return new Promise((resolve) => {
    //@ts-ignore
    setTimeout(() => resolve(import('@src/views/Home/Home')), 2000)
  })
})

const SignUp = React.lazy(() => {
  return new Promise((resolve) => {
    //@ts-ignore
    setTimeout(() => resolve(import('@src/views/SignUp/SignUp')), 2000)
  })
})

const NotFound = React.lazy(() => {
  return new Promise((resolve) => {
    //@ts-ignore
    setTimeout(() => resolve(import('@src/views/NotFound/NotFound')), 2000)
  })
})

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    overflow: 'hidden',
  },
}))

const theme = createTheme({})

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

export interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { children } = props
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return children
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()
  console.log({ isAuthenticated })

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={isAuthenticated ? <Navigate to={'/channel'} /> : <SignUp />}
        />
        <Route
          index
          path='/channel/*'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/404' Component={NotFound} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export const App: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloClientProvider>
        <AuthProvider>
          <HeaderContainer />
          <main className={classes.layout}>
            <ErrorBoundary>
              <Suspense fallback={<LinearWithValueLabel />}>
                <AppRoutes />
              </Suspense>
            </ErrorBoundary>
          </main>
        </AuthProvider>
      </ApolloClientProvider>
    </ThemeProvider>
  )
}

export default App
