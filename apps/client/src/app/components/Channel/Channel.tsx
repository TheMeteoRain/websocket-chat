import React from 'react'
import { ChannelChatWindow, ChannelChatWindowProps } from './ChannelChatWindow'
import { ChannelForm, ChannelFormProps } from './ChannelForm'
import { ChannelHeader } from './ChannelHeader'

export type ChannelProps = ChannelChatWindowProps &
  ChannelFormProps & {
    title: React.ReactNode
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

export const Channel: React.FC<ChannelProps> = (props) => {
  const {
    id,
    user,
    title,
    messages = [],
    handleOnSubmit,
    channelChatWindowRef,
  } = props
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
      <ChannelHeader>{title}</ChannelHeader>
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
