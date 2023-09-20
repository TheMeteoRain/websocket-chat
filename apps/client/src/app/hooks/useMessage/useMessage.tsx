import { useCreateMessageMutation } from '@src/graphql/mutations/createMessage.generated'
import gql from 'graphql-tag'

export interface UseMessageReturnProps {
  createMessageMutation: ReturnType<typeof useCreateMessageMutation>
}

export const useMessage = (): UseMessageReturnProps => {
  const createMessageMutation = useCreateMessageMutation({
    update(cache, { data: { createMessage } }) {
      cache.modify({
        fields: {
          // don't know why this works, if there are bugs related to messages
          // look at this code :clown_face:
          // https://www.apollographql.com/docs/react/data/mutations/
          channelsByMemberId(existingData = []) {
            const newMessageRef = cache.writeFragment({
              data: createMessage,
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

            return [...existingData, newMessageRef]
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
