import Card from '@mui/material/Card'
import React from 'react'
import Message from '../../@types/Message'
import { styled } from '@mui/material/styles'

const MessageCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'myMessage',
})<{ myMessage: boolean }>(({ theme, myMessage }) => ({
  ...theme.typography.body1,
  backgroundColor: myMessage
    ? theme.palette.background.paper
    : theme.palette.background.paper,
  padding: theme.spacing(1),
  alignSelf: myMessage ? 'flex-end' : 'flex-start',
  margin: theme.spacing(2),
  overflow: 'unset',
  overflowWrap: 'anywhere',
}))

export type ChannelChatMessageProps = {
  message: Message
  myMessage: boolean
}

export const ChannelChatMessage: React.FC<ChannelChatMessageProps> = ({
  message: { text },
  myMessage,
}) => {
  return (
    <MessageCard myMessage={myMessage} data-testid='channel-chat-message'>
      {text}
    </MessageCard>
  )
}
