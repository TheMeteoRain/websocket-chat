interface Message extends Base {
  id: string
  text: string
  author: Member
  channelId: string
}
