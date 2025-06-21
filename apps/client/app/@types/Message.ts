import { Message as BackendMessage } from '@rally/types/graphql/index'

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
