import { Member as BackendMember } from '@rally/types/graphql/index'

export default interface Member
  extends Pick<
    BackendMember,
    '__typename' | 'firstName' | 'lastName' | 'createdAt' | 'id' | 'updatedAt'
  > {}
