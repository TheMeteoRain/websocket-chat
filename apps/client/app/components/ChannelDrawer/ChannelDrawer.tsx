import List from '@mui/material/List'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import { CurrentMemberQuery } from '@rally/types/graphql'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router'
import { ChannelsByMemberIdQuery } from '../../graphql/queries/channelsByMemberId.generated'
import StyledAvatar from '../StyledAvatar'

const StyledNavLink = styled(NavLink)<NavLinkProps>(({ theme }) => ({
  '&, :visited': {
    color: theme.palette.text.primary,
  },
  ':hover': {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}))

const StyledListItem = styled(ListItem)<ListItemProps>(({ theme }) => ({
  ':hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.main
        : theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
}))

export type ChannelDrawerProps = {
  channels: ChannelsByMemberIdQuery['channelsByMemberId']
  myUser: CurrentMemberQuery['currentMember']
}

export const ChannelDrawer: React.FC<ChannelDrawerProps> = ({
  channels = [],
  myUser,
}) => {
  return (
    <div style={{ overflowY: 'scroll' }}>
      <List>
        {channels.map(({ id: channelId, members }, _index) => {
          const recipient = members.find((member) => member.id !== myUser?.id)

          if (!recipient) {
            return null
          }

          const { firstName, lastName } = recipient

          return (
            <StyledNavLink
              to={`/channel/${channelId}/messages`}
              key={`channel:${channelId}`}
            >
              <StyledListItem>
                <ListItemIcon>
                  <StyledAvatar member={recipient} />
                </ListItemIcon>
                <ListItemText primary={`${firstName} ${lastName}`} />
              </StyledListItem>
            </StyledNavLink>
          )
        })}
      </List>
    </div>
  )
}

export default ChannelDrawer
