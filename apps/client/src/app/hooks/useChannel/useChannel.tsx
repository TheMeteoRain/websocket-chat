import {
  ChannelsByMemberIdQueryResult,
  useChannelsByMemberIdQuery,
} from '@src/graphql/queries/channelsByMemberId.generated'
import {
  ChannelDocument,
  ChannelSubscription,
} from '@src/graphql/subscriptions/channel.generated'
import {
  NewMessageDocument,
  NewMessageSubscription,
} from '@src/graphql/subscriptions/newMessage.generated'
import { useAuth } from '@src/hooks/useAuth'
import React from 'react'

export interface UseChannelReturnProps extends ChannelsByMemberIdQueryResult {}

export const useChannel = (): UseChannelReturnProps => {
  const { member } = useAuth()
  const channelsByMemberIdQuery = useChannelsByMemberIdQuery({
    variables: { memberId: member.id },
  })
  const { subscribeToMore } = channelsByMemberIdQuery

  // listen to new channels
  React.useEffect(() => {
    let unsubscribe: ReturnType<typeof subscribeToMore>

    unsubscribe = subscribeToMore<ChannelSubscription>({
      document: ChannelDocument,
      // @ts-ignore newChannel is of wrong type
      updateQuery: (prev, { subscriptionData }) => {
        return {
          __typename: prev.__typename,
          channelsByMemberId: [
            ...prev.channelsByMemberId,
            subscriptionData.data.newChannel,
          ],
        }
      },
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // listen to new messages
  React.useEffect(() => {
    let unsubscribe: ReturnType<typeof subscribeToMore>

    unsubscribe = subscribeToMore<NewMessageSubscription>({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        return {
          __typename: prev.__typename,
          channelsByMemberId: prev.channelsByMemberId.map(
            (channelByMemberId) => {
              if (
                channelByMemberId.id ===
                subscriptionData.data.newMessage.channelId
              ) {
                return {
                  ...channelByMemberId,
                  messages: [
                    ...channelByMemberId.messages,
                    subscriptionData.data.newMessage,
                  ],
                }
              } else {
                return channelByMemberId
              }
            }
          ),
        }
      },
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return channelsByMemberIdQuery
}

export default useChannel
