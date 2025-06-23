import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import Member from '../../@types/Member'

export interface HeaderProps {
  user: Member
  logOutFn: React.MouseEventHandler<HTMLButtonElement>
}

export const Header: React.FC<HeaderProps> = ({ user, logOutFn }) => {
  const isUserPresent = user?.firstName && user?.lastName ? true : false

  return (
    <AppBar data-testid='header-bar'>
      <Toolbar>
        <Typography variant='h6' data-testid='header-user'>
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
