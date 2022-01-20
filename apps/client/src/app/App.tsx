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
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloClientProvider } from './providers'

const Home = React.lazy(() => {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setTimeout(() => resolve(import('@src/views/Home/Home')), 2000)
  })
})

const SignUp = React.lazy(() => {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setTimeout(() => resolve(import('@src/views/SignUp/SignUp')), 2000)
  })
})

const NotFound = React.lazy(() => {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { children, ...rest } = props
  const { isAuthenticated } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

const Routes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {isAuthenticated ? <Redirect to='/channel' /> : <SignUp />}
        </Route>

        <PrivateRoute
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          path='/channel'
        >
          <Home />
        </PrivateRoute>
        <Route component={NotFound} path='/404' />
      </Switch>
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
                <Routes />
              </Suspense>
            </ErrorBoundary>
          </main>
        </AuthProvider>
      </ApolloClientProvider>
    </ThemeProvider>
  )
}

export default App
