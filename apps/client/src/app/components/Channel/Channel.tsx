import React from 'react'
import { Member, useSocial } from '@src/contexts/SocialContext/SocialContext'
import { ChannelChatWindow, ChannelChatWindowProps } from './ChannelChatWindow'
import { ChannelForm, ChannelFormProps } from './ChannelForm'
import { ChannelUser, ChannelUserProps } from './ChannelUser'

export type ChannelProps = ChannelChatWindowProps &
  ChannelFormProps &
  ChannelUserProps & {
    recipient: Member
    channelChatWindowRef?: React.MutableRefObject<HTMLElement>
  }

const scrollToTheBottomOfHTMLElement = (htmlElement: HTMLElement) => {
  htmlElement.scrollTo({ left: 0, top: htmlElement.scrollHeight })
}

const isScrolledToBottomOfHTMLElement = (htmlElement: HTMLElement) => {
  return (
    htmlElement.scrollTop + htmlElement.clientHeight + 300 >
    htmlElement.scrollHeight
  )
}

export const Channel: React.FC<ChannelProps> = ({
  id,
  user,
  recipient,
  messages = [],
  handleOnSubmit,
  channelChatWindowRef,
}) => {
  const firstUpdate = React.useRef(true)

  React.useLayoutEffect(() => {
    if (messages.length > 0 && firstUpdate.current) {
      channelChatWindowRef.current.scrollIntoView(false)
      scrollToTheBottomOfHTMLElement(channelChatWindowRef.current)
      firstUpdate.current = false
    }

    if (isScrolledToBottomOfHTMLElement(channelChatWindowRef.current)) {
      scrollToTheBottomOfHTMLElement(channelChatWindowRef.current)
    }
  }, [channelChatWindowRef, messages, firstUpdate])

  return (
    <React.Fragment>
      <ChannelUser user={recipient} />
      <ChannelChatWindow
        user={user}
        messages={messages}
        ref={channelChatWindowRef}
      />
      <ChannelForm id={id} handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  )
}

export default Channel
