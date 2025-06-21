import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import React from 'react'
import { ThemeModes } from '../../providers/MuiThemeProvider/MuiThemeProvider'
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const StyledTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    textDecoration: 'none',
    alignItems: 'center',
  },
}))
const Logo = styled('img')(({ theme }) => ({
  width: '60px',
}))
export interface StyledAppBarProps extends AppBarProps {
  themeMode: ThemeModes
  handleToggleTheme: React.MouseEventHandler<HTMLButtonElement>
  components?: React.ReactElement[]
}

export default function StyledAppBar(props: StyledAppBarProps) {
  const { themeMode, handleToggleTheme, components, ...rest } = props

  return (
    <AppBar position='static' variant='outlined' {...rest}>
      <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
          <StyledTypography variant='h6' noWrap>
            RALLY
          </StyledTypography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title='Toggle color theme'>
            <IconButton
              size='large'
              color='inherit'
              onClick={handleToggleTheme}
            >
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          {components}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
