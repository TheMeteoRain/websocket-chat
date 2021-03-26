import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ErrorBoundary, LinearWithValueLabel } from '@src/components'
import { HeaderContainer } from '@src/containers'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { SocialProvider } from '@src/contexts'
import { useSocial } from '@src/contexts'
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

const theme = createMuiTheme({})

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

const Routes = () => {
  const { isAuthenticated } = useSocial()

  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => {
            if (isAuthenticated) return <Redirect to='/channel' />
            return <SignUp {...props} />
          }}
        />
        <Route
          path='/channel'
          render={(props) => {
            if (isAuthenticated) return <Home {...props} />
            return <Redirect to='/' />
          }}
        />
        <Route component={NotFound} path='/404' />
        {/* <Redirect to='/404' /> */}
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
        <SocialProvider>
          <HeaderContainer />
          <main className={classes.layout}>
            <ErrorBoundary>
              <Suspense fallback={<LinearWithValueLabel />}>
                <Routes />
              </Suspense>
            </ErrorBoundary>
          </main>
        </SocialProvider>
      </ApolloClientProvider>
    </ThemeProvider>
  )
}

export default App
