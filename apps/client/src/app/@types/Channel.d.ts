type ChannelMessage = Omit<Message, 'channelId' | 'author'> & {
  authorId: string
}
type ChannelMember = Member

interface Channel extends Base {
  id: string
  messages: ChannelMessage[]
  members: ChannelMember[]
}
