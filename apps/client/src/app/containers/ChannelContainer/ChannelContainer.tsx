import { CircularProgress } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Channel } from '@src/components/Channel'
import { useCreateMessageMutation } from '@src/graphql/mutations/createMessage.generated'
import { useChannelByIdQuery } from '@src/graphql/queries/channelById.generated'
import {
  MessageDocument,
  MessageSubscription,
  MessageSubscriptionVariables,
} from '@src/graphql/subscriptions/message.generated'
import { useAuth } from '@src/hooks/useAuth'
import { useParams } from '@src/react/useParams'
import { getUserAvatarName } from '@src/utils/user'
import React from 'react'

export interface ChannelContainerProps { }

export const ChannelContainer: React.FC<ChannelContainerProps> = () => {
  const { channelId } = useParams()
  const { member } = useAuth()
  const channelChatWindowRef = React.useRef<HTMLElement>(null)
  const { data, loading, subscribeToMore } = useChannelByIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: { channelId: channelId, memberId: member.id },
  })
  const [createMessage] = useCreateMessageMutation()

  React.useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<MessageSubscription, MessageSubscriptionVariables>({
        document: MessageDocument,
        variables: { channelId },
        updateQuery: (prev, { subscriptionData }) => {
          return {
            ...prev,
            channelById: {
              ...prev.channelById,
              messagesByChannelId: {
                ...prev.channelById.messagesByChannelId,
                nodes: [
                  ...prev.channelById.messagesByChannelId.nodes,
                  subscriptionData.data.newMessage.message,
                ],
              },
            },
          }
        },
      })
    }
  }, [channelId, subscribeToMore])

  const messages = React.useMemo(() => {
    if (!data) return []
    return data.channelById.messagesByChannelId.nodes.map((node) => node)
  }, [data])
  const recipient = React.useMemo(() => {
    return data?.channelById?.channelMembersByChannelId?.nodes.map(
      ({ memberByMemberId }) => memberByMemberId
    )[0]
  }, [data])

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // After promise event.currentTarget is no longer available - so will save it here :)
    const currentTarget = event.currentTarget
    const formData = new FormData(currentTarget)
    const message = formData.get('message') as string

    if (message) {
      const { data, errors } = await createMessage({
        variables: {
          text: message,
          memberId: member.id,
          channelId,
        },
      })

      if (data) {
        currentTarget.reset()
      }

      if (errors) {
        console.error(errors)
      }
    }
  }

  return (
    <Channel
      id={channelId}
      handleOnSubmit={handleOnSubmit}
      user={member}
      title={
        recipient && (
          <>
            <ListItemIcon>
              <Avatar>{getUserAvatarName(recipient)}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={`${recipient.firstName} ${recipient.lastName}`}
            />
          </>
        )
      }
      messages={messages}
      channelChatWindowRef={channelChatWindowRef}
    />
  )
}

export default ChannelContainer
