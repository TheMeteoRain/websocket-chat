import { Member as BackendMember } from '@root/types/lib/models/graphql'

export default interface Member
  extends Pick<
    BackendMember,
    '__typename' | 'firstName' | 'lastName' | 'createdAt' | 'id' | 'updatedAt'
  > {}
