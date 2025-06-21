import React from 'react'

import { useChannelsByMemberIdLazyQuery } from '../../graphql/queries/channelsByMemberId.generated'
import {
  ChannelDocument,
  ChannelSubscription,
} from '../../graphql/subscriptions/channel.generated'
import { useAuth } from '../useAuth'

export interface UseChannelProps {}
export type UseChannelReturnProps = ReturnType<typeof useChannel>

export const useChannel = (props?: UseChannelProps) => {
  const { member } = useAuth()
  const [channelsByMemberIdQuery, result] = useChannelsByMemberIdLazyQuery()

  React.useEffect(() => {
    if (!member?.id) return

    channelsByMemberIdQuery({
      variables: {
        memberId: member.id,
      },
    })
  }, [channelsByMemberIdQuery, member?.id])

  React.useEffect(() => {
    if (!member?.id) return

    const unsubscribe = result.subscribeToMore<ChannelSubscription>({
      document: ChannelDocument,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('ChannelDocument', prev, subscriptionData)

        if (subscriptionData.data.newChannel) {
          return {
            channelsByMemberId: [
              ...prev.channelsByMemberId,
              subscriptionData.data.newChannel,
            ],
          }
        }

        return prev
      },
      onError(error) {
        console.error(error)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [member?.id, result])

  return result
}

export default useChannel
