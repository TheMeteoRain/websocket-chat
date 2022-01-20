import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatarName } from '@src/utils/user'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },

    link: {
      textDecoration: 'none',
    },
  })
)

export type ChannelDrawerProps = {
  channels: Channel[]
  myUser: Member
}

export const ChannelDrawer: React.FC<ChannelDrawerProps> = ({
  channels = [],
  myUser,
}) => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {channels.map(({ id: channelId, members }, _index) => {
            const recipient = members.find((member) => member.id !== myUser.id)
            const { firstName, lastName } = recipient

            const avatarName = getUserAvatarName(recipient)

            return (
              <Link
                to={`/channel/${channelId}/messages`}
                className={classes.link}
                key={channelId}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Avatar>{avatarName}</Avatar>
                  </ListItemIcon>
                  <ListItemText primary={`${firstName} ${lastName}`} />
                </ListItem>
              </Link>
            )
          })}
        </List>
      </div>
    </Drawer>
  )
}

export default ChannelDrawer
