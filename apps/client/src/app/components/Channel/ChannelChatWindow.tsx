import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { ChannelChatMessage } from './ChannelChatMessage'
import Member from '@src/@types/Member'
import Message from '@src/@types/Message'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      height: '47vh',
      overflowY: 'visible',
      overflow: 'hidden',
    },
  })
)

export type ChannelChatWindowProps = {
  user: Member
  messages: Message[]
}

export const ChannelChatWindow = React.forwardRef<
  HTMLElement,
  ChannelChatWindowProps
>((props, ref) => {
  const { user, messages = [] } = props
  const classes = useStyles()

  return (
    <Paper
      className={classes.paper}
      elevation={1}
      data-testid='channel-chat'
      ref={ref}
    >
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
    </Paper>
  )
})
