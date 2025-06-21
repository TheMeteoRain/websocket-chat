import Avatar from '@mui/material/Avatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { Channel } from '../../components/Channel'
import { Loading } from '../../components/Loading/Loading'
import { useAuth } from '../../hooks/useAuth'
import useChannels from '../../hooks/useChannels'
import useMessage from '../../hooks/useMessage'
import { getUserAvatarName } from '../../utils/user/getUserAvatarName'
import StyledAvatar from '../../components/StyledAvatar'

export interface ChannelContainerProps {
  channelId: string
}

export const ChannelContainer: React.FC<ChannelContainerProps> = (
  props: ChannelContainerProps
) => {
  const { channelId } = props
  const channelChatWindowRef = React.useRef<HTMLDivElement>(null)
  const { member } = useAuth()
  const { data, loading, error, ...result } = useChannels({ channelId })
  const {
    createMessageMutation: [createMessage],
  } = useMessage()

  const recipient = React.useMemo(() => {
    if (!data?.channelById?.members) return null
    return data?.channelById?.members?.find(
      (channelMember) => channelMember.id !== member?.id
    )
  }, [data?.channelById?.members, member?.id])

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // After promise event.currentTarget is no longer available - so will save it here :)
    const currentTarget = event.currentTarget
    const formData = new FormData(currentTarget)
    const message = formData.get('message') as string

    if (message) {
      const { data, errors } = await createMessage({
        variables: {
          text: message,
          // @ts-expect-error: type check member better - later
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

  if (loading || result.networkStatus === 1) {
    return <Loading size={'10rem'} />
  }

  if (error || !member || !data?.channelById) {
    return <div>error</div>
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
              <StyledAvatar member={recipient} />
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
