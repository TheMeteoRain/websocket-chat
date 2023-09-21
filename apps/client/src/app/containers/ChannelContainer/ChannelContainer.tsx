import Avatar from '@material-ui/core/Avatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Member from '@src/@types/Member'
import { Channel } from '@src/components/Channel'
import { useChannelByIdQuery } from '@src/graphql/queries/channelById.generated'
import { useMessage } from '@src/hooks'
import { useAuth } from '@src/hooks/useAuth'
import { useParams } from '@src/react/useParams'
import { getUserAvatarName } from '@src/utils/user'
import React from 'react'

export interface ChannelContainerProps {}

export const ChannelContainer: React.FC<ChannelContainerProps> = () => {
  const { channelId } = useParams()
  const { member } = useAuth()
  const channelChatWindowRef = React.useRef<HTMLElement>(null)
  const { data, loading, subscribeToMore, error } = useChannelByIdQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: channelId },
  })
  const {
    createMessageMutation: [createMessage],
  } = useMessage()

  const recipient: Member | null = React.useMemo(() => {
    if (!data) return null
    return data?.channelById?.members?.find(
      (channelMember) => channelMember.id !== member.id
    )
  }, [data?.channelById?.members?.length])

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

  if (error) {
    return <div>error</div>
  }

  if (!data && loading && !error) {
    return <div>loading...</div>
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
      messages={data.channelById.messages}
      channelChatWindowRef={channelChatWindowRef}
    />
  )
}

export default ChannelContainer
