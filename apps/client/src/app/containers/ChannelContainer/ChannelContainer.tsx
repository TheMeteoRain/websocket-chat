import { gql } from '@apollo/client'
import {
  MessageSubscriptionInput,
  MessageSubscriptionPayload,
  Query,
} from '@mete/types'
import { Channel } from '@src/components/Channel'
import {
  QueryChannelByIdData,
  RecordWrapper,
  useSocial,
} from '@src/contexts/SocialContext'
import { useCreateMessageMutation } from '@src/graphql/mutations/createMessage.generated'
import { useGueryMessagesByChannelIdQuery } from '@src/graphql/queries/messagesByChannelId.generated'
import {
  MessageDocument,
  MessageSubscription,
  MessageSubscriptionVariables,
} from '@src/graphql/subscriptions/message.generated'
import { useRouteMatch } from '@src/react/useRouteMatch'
import React from 'react'

export interface ChannelContainerProps {}

export const ChannelContainer: React.VFC<ChannelContainerProps> = () => {
  const {
    params: { channelId },
  } = useRouteMatch()
  const { current_member } = useSocial()
  const channelChatWindowRef = React.useRef<HTMLElement>(null)

  const { data, loading, subscribeToMore } = useGueryMessagesByChannelIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: channelId },
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

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // After promise event.currentTarget is no longer available - so will save it here :)
    const currentTarget = event.currentTarget
    const formData = new FormData(currentTarget)
    const message = formData.get('message') as string

    if (message) {
      const { data, errors } = await createMessage({
        variables: {
          text: message,
          memberId: current_member.id,
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
      user={current_member}
      title={'a'}
      loading={loading}
      messages={messages}
      channelChatWindowRef={channelChatWindowRef}
    />
  )
}

export default ChannelContainer
