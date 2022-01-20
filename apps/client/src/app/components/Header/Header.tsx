import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

export interface HeaderProps {
  user: Member
  logOutFn: React.MouseEventHandler<HTMLButtonElement>
}

export const Header: React.FC<HeaderProps> = ({ user, logOutFn }) => {
  const classes = useStyles()
  const isUserPresent = user?.firstName && user?.lastName ? true : false

  return (
    <AppBar className={classes.appBar} data-testid='header-bar'>
      <Toolbar>
        <Typography
          variant='h6'
          className={classes.title}
          data-testid='header-user'
        >
          {isUserPresent ? `${user.firstName} ${user.lastName}` : null}
        </Typography>
        {isUserPresent && (
          <Button color='inherit' onClick={logOutFn}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
