import Card from '@material-ui/core/Card'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Message from '@src/@types/Message'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      ...theme.typography.body1,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      alignSelf: 'flex-start',
      margin: theme.spacing(2),
      overflow: 'unset',
    },
    myMessage: {
      ...theme.typography.body1,
      backgroundColor: '#11fb2338',
      padding: theme.spacing(1),
      alignSelf: 'flex-end',
      margin: theme.spacing(2),
      overflow: 'unset',
    },
  })
)

export type ChannelChatMessageProps = {
  message: Message
  myMessage: boolean
}

export const ChannelChatMessage: React.FC<ChannelChatMessageProps> = ({
  message: { text },
  myMessage,
}) => {
  const classes = useStyles()

  return (
    <Card
      className={myMessage ? classes.myMessage : classes.message}
      data-testid='channel-chat-message'
    >
      {text}
    </Card>
  )
}
