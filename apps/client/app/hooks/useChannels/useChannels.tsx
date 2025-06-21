import React from 'react'
import { useChannelByIdLazyQuery } from '../../graphql/queries/channelById.generated'
import {
  NewMessageDocument,
  NewMessageSubscription,
} from '../../graphql/subscriptions/newMessage.generated'
import { useAuth } from '../useAuth'

export interface UseChannelsProps {
  channelId: string
}
export type UseChannelsReturnProps = ReturnType<typeof useChannels>

export const useChannels = (props: UseChannelsProps) => {
  const { channelId } = props
  const { member } = useAuth()

  const [channelById, result] = useChannelByIdLazyQuery({
    fetchPolicy: 'cache-first',
    variables: { id: channelId },
  })

  React.useEffect(() => {
    if (!member?.id) return

    channelById()
  }, [channelById, member?.id])

  // listen to new messages
  React.useEffect(() => {
    if (!member?.id) return

    const unsubscribe = result.subscribeToMore<NewMessageSubscription>({
      document: NewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        // message was meant for this channel
        if (
          prev?.channelById &&
          prev.channelById.id === subscriptionData.data.newMessage?.channelId
        ) {
          return {
            channelById: {
              ...prev.channelById,
              messages: [
                ...prev.channelById.messages,
                subscriptionData.data.newMessage,
              ],
            },
          }
        }

        return
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

export default useChannels
