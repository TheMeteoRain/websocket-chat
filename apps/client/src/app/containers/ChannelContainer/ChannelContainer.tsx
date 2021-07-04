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
import { useRouteMatch } from '@src/react/useRouteMatch'
import React from 'react'

const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription($channelId: UUID!) {
    newMessage(input: { channelId: $channelId }) {
      message {
        id
        memberId
        text
      }
    }
  }
`

export type ChannelContainerProps = unknown

export const ChannelContainer: React.VFC<ChannelContainerProps> = () => {
  const { params } = useRouteMatch()
  const channelChatWindowRef = React.useRef<HTMLElement>(null)
  const {
    current_member,
    channels,
    sendMessage,
    getMessagesByChannelIdQuery,
    dispatch,
  } = useSocial()
  const [
    getMessageByChannelId,
    {
      data: getMessagesByChannelIdData,
      loading: getMessagesByChannelIdLoading,
      subscribeToMore: subscribeForMoreMessagesByChannelId,
    },
  ] = getMessagesByChannelIdQuery

  const channelId = params.channelId
  const { users, messages } = channels.find(({ id }) => id === channelId)
  const recipient = users.find((user) => user.id !== current_member.id)

  React.useEffect(() => {
    getMessageByChannelId({ variables: { id: channelId } })
  }, [getMessageByChannelId, channelId])

  React.useEffect(() => {
    dispatch({
      type: 'UPDATE_CHANNEL_MESSAGES',
      payload: {
        channelId: channelId,
        messages: getMessagesByChannelIdData?.channelById?.messagesByChannelId?.edges.flatMap(
          (messagesEdge) => messagesEdge.node
        ),
      },
    })
  }, [
    channelId,
    dispatch,
    getMessagesByChannelIdData?.channelById?.messagesByChannelId?.edges,
  ])

  React.useLayoutEffect(() => {
    let unsubscribe: () => void

    if (subscribeForMoreMessagesByChannelId) {
      unsubscribe = subscribeForMoreMessagesByChannelId<
        RecordWrapper<'newMessage', MessageSubscriptionPayload>,
        MessageSubscriptionInput
      >({
        document: MESSAGE_SUBSCRIPTION,
        variables: { channelId: channelId },
        updateQuery: (prev, { subscriptionData }) => {
          const next = Object.assign<
            QueryChannelByIdData,
            QueryChannelByIdData,
            QueryChannelByIdData
          >({}, prev, {
            channelById: {
              ...prev.channelById,
              messagesByChannelId: {
                ...prev.channelById.messagesByChannelId,
                edges: [
                  ...prev.channelById.messagesByChannelId.edges,
                  {
                    node: subscriptionData.data.newMessage.message,
                  },
                ],
              },
            },
          })

          return next
        },
      })
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [subscribeForMoreMessagesByChannelId, channelId])

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // After promise event.currentTarget is no longer available - so will save it here :)
    const currentTarget = event.currentTarget
    const formData = new FormData(currentTarget)
    const message = formData.get('message') as string

    if (message) {
      const sentMessage = await sendMessage({
        text: message,
        memberId: current_member.id,
        channelId,
      })

      if (sentMessage) {
        currentTarget.reset()
      }
    }
  }

  return (
    <Channel
      id={channelId}
      handleOnSubmit={handleOnSubmit}
      user={current_member}
      recipient={recipient}
      messages={messages}
      channelChatWindowRef={channelChatWindowRef}
    />
  )
}

export default ChannelContainer
