import Avatar from '@mui/material/Avatar'
import { Member } from '@rally/types/graphql'
import React from 'react'
import stringToHexColor from '../../utils/stringToHexColor'
import { getUserAvatarName } from '../../utils/user'

export type ChannelMembersDrawerProps = {
  member: Omit<Member, 'channels' | 'createdAt' | 'updatedAt'>
}

export const ChannelMembersDrawer: React.FC<ChannelMembersDrawerProps> = ({
  member,
}) => {
  const avatarName = getUserAvatarName(member)
  const linearGradientColors = [
    stringToHexColor(member.firstName),
    stringToHexColor(member.lastName),
  ]

  return (
    <Avatar
      style={{
        background: `linear-gradient(${linearGradientColors[0]}, ${linearGradientColors[1]})`,
      }}
    >
      {avatarName}
    </Avatar>
  )
}

export default ChannelMembersDrawer
