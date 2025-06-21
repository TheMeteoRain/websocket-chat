import { Member } from '@rally/types/graphql'

export const getUserAvatarName = (
  user: Omit<Member, 'channels' | 'createdAt' | 'updatedAt'>
) => {
  return user.firstName.charAt(0) + user.lastName.charAt(0)
}
