import { useApolloClient } from '@apollo/client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import StyledAppBar from '../../components/StyledAppBar'
import { useInvalidateSessionLazyQuery } from '../../graphql/queries/invalidateSession.generated'
import { useTheme } from '../../providers/MuiThemeProvider/MuiThemeProvider'
import { CurrentMemberQuery } from '@rally/types/graphql'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { AppBarProps } from '@mui/material/AppBar'

export interface ProtectedAppBarProps extends AppBarProps {
  member: CurrentMemberQuery['currentMember']
  token?: string
}

function ProtectedAppBar(props: ProtectedAppBarProps) {
  const { token, member, ...rest } = props
  const { themeMode, toggleTheme } = useTheme()
  // const navigate = useNavigate()
  const apolloClient = useApolloClient()

  const [invalidateSession] = useInvalidateSessionLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const handleLogout = React.useCallback(async () => {
    if (!token) return

    const result = await invalidateSession({
      variables: { token: token },
    })

    if (result.data?.invalidateSession) {
      await apolloClient.clearStore()
      // TODO: this does not work because it triggers authentication x 2 somehow in unprotected.tsx
      // navigate('/')
      // executing hard refresh for now
      window.location.replace('/')
    }
  }, [apolloClient, invalidateSession, token])

  const AccountComponent = React.useMemo(() => {
    return (
      <Tooltip
        key='AccountButton'
        title={member?.id ? `${member.firstName} ${member.lastName}` : ''}
      >
        <IconButton size='large' color='inherit'>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
    )
  }, [member?.firstName, member?.id, member?.lastName])

  const LogoutComponent = React.useMemo(() => {
    return (
      <IconButton
        key='LogoutButton'
        size='large'
        color='error'
        onClick={handleLogout}
      >
        <LogoutIcon />
      </IconButton>
    )
  }, [handleLogout])

  return (
    <StyledAppBar
      {...rest}
      components={[AccountComponent, LogoutComponent]}
      handleToggleTheme={() => {
        toggleTheme()
      }}
      themeMode={themeMode}
    />
  )
}

export default ProtectedAppBar
