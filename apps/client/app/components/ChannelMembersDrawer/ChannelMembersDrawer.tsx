import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  ChannelsByMemberIdQuery,
  CurrentMemberQuery,
} from '@rally/types/graphql'
import React from 'react'
import { useParams } from 'react-router'
import StyledAvatar from '../StyledAvatar'

export type ChannelMembersDrawerProps = {
  channels: ChannelsByMemberIdQuery['channelsByMemberId']
  myUser: CurrentMemberQuery['currentMember']
}

export const ChannelMembersDrawer: React.FC<ChannelMembersDrawerProps> = ({
  channels = [],
  myUser,
}) => {
  const params = useParams()

  const { channelId } = params

  return (
    <div style={{ overflowY: 'scroll' }}>
      <List>
        {channels
          .find((channel) => channel.id === channelId)
          ?.members.map((member) => {
            const { firstName, lastName } = member
            return (
              <ListItem key={`member:${member.id}`}>
                <ListItemIcon>
                  <StyledAvatar member={member} />
                </ListItemIcon>
                <ListItemText
                  primary={`${firstName} ${lastName}`}
                  style={{
                    textOverflow: 'ellipsis',
                    overflowY: 'hidden',
                    textWrap: 'nowrap',
                  }}
                />
              </ListItem>
            )
          })}
      </List>
    </div>
  )
}

export default ChannelMembersDrawer
