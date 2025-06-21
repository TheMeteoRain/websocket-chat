import { AppBarProps } from '@mui/material/AppBar'
import StyledAppBar from '../../components/StyledAppBar'
import { useTheme } from '../../providers/MuiThemeProvider/MuiThemeProvider'

export interface UnprotectedAppBar extends AppBarProps {}

function UnprotectedAppBar(props: UnprotectedAppBar) {
  const { themeMode, toggleTheme } = useTheme()

  return (
    <StyledAppBar
      {...props}
      handleToggleTheme={() => {
        toggleTheme()
      }}
      themeMode={themeMode}
    />
  )
}

export default UnprotectedAppBar
