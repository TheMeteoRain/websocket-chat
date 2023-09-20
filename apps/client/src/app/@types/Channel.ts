import { Channel as BackendChannel } from '@root/types/lib/models/graphql'
import Member from './Member'

export default interface Channel
  extends Pick<
    BackendChannel,
    '__typename' | 'id' | 'createdAt' | 'updatedAt' | 'messages'
  > {
  members: Member[]
}
