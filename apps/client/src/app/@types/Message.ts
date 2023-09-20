import { Message as BackendMessage } from '@root/types/lib/models/graphql'

export default interface Message
  extends Pick<
    BackendMessage,
    | '__typename'
    | 'channelId'
    | 'id'
    | 'createdAt'
    | 'memberId'
    | 'text'
    | 'updatedAt'
  > {}
