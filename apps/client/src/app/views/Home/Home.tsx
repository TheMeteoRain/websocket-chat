import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Link,
} from 'react-router-dom'
import { Channel, ChannelDrawer } from '@src/components'
import { useSocial } from '@src/contexts'
import { ChannelContainer } from '@src/containers/ChannelContainer'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(8),
    },
  })
)

export interface HomeProps extends RouteComponentProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles()
  const { path, url } = useRouteMatch()
  const { current_member, channels = [], logout, getChannels } = useSocial()

  React.useLayoutEffect(() => {
    getChannels()
  }, [getChannels])

  return (
    <div className={classes.root}>
      <ChannelDrawer channels={channels} myUser={current_member} />

      <main className={classes.content}>
        <Switch>
          <Route exact path={path}>
            <div>TYHJÄ</div>
          </Route>
          <Route path={`${path}/:channelId/messages`}>
            <ChannelContainer />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default Home
