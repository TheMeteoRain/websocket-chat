import Paper from '@mui/material/Paper'
import React from 'react'
import { ChannelChatMessage } from './ChannelChatMessage'
import { styled } from '@mui/material/styles'
import { CurrentMemberQuery, Member, Message } from '@rally/types/graphql'

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  height: '47vh',
  overflow: 'hidden',
  overflowY: 'scroll',
  flexGrow: 1,
}))

export type ChannelChatWindowProps = {
  user: NonNullable<CurrentMemberQuery['currentMember']>
  messages: Message[]
}

export const ChannelChatWindow = React.forwardRef<
  HTMLDivElement,
  ChannelChatWindowProps
>((props, ref) => {
  const { user, messages = [] } = props

  return (
    <StyledPaper elevation={1} data-testid='channel-chat' ref={ref}>
      {messages.map((message, _index) => {
        const { memberId } = message
        const myMessage = memberId === user.id

        return (
          <ChannelChatMessage
            key={message.id}
            message={message}
            myMessage={myMessage}
          />
        )
      })}
    </StyledPaper>
  )
})
