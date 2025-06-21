import { gql, Reference } from '@apollo/client/core'
import { useCreateMessageMutation } from '../../graphql/mutations/createMessage.generated'

export interface UseMessageReturnProps {
  createMessageMutation: ReturnType<typeof useCreateMessageMutation>
}

export const useMessage = (): UseMessageReturnProps => {
  const createMessageMutation = useCreateMessageMutation({
    update(cache, { data }) {
      if (!data?.createMessage) return
      const newMessage = data.createMessage

      const channelId = newMessage.channelId
      const channelCacheId = cache.identify({
        __typename: 'Channel',
        id: channelId,
      })

      cache.modify({
        id: channelCacheId,
        fields: {
          messages(existingMessageRefs, { readField }) {
            if (
              existingMessageRefs.some(
                (ref: Reference) => readField('id', ref) === newMessage.id
              )
            ) {
              return existingMessageRefs
            }

            console.log({ existingMessageRefs })
            const newMessageRef = cache.writeFragment({
              data: newMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  text
                  channelId
                  memberId
                  createdAt
                  updatedAt
                }
              `,
            })

            return [...existingMessageRefs, newMessageRef]
          },
        },
      })
    },
  })

  return {
    createMessageMutation,
  }
}

export default useMessage
