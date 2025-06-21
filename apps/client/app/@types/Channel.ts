import { Channel as BackendChannel } from '@rally/types/graphql/index'
import Member from './Member'

export default interface Channel
  extends Pick<
    BackendChannel,
    '__typename' | 'id' | 'createdAt' | 'updatedAt' | 'messages'
  > {
  members: Member[]
}
