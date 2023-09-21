import { createStyles, makeStyles } from '@material-ui/core/styles'
import { ChannelDrawer } from '@src/components'
import { ChannelContainer } from '@src/containers/ChannelContainer'
import { useChannel } from '@src/hooks'
import { useAuth } from '@src/hooks/useAuth'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(10),
    },
  })
)

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles()
  const { member } = useAuth()
  const { data } = useChannel()

  return (
    <div className={classes.root}>
      <ChannelDrawer channels={data?.channelsByMemberId} myUser={member} />

      <main className={classes.content}>
        <Routes>
          <Route path={'/'} element={<div>CHANNEL</div>} />
          <Route path={'/:channelId/messages'} Component={ChannelContainer} />
        </Routes>
      </main>
    </div>
  )
}

export default Home
