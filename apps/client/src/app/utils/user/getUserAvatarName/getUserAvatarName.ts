export const getUserAvatarName = (user: Member) => {
  return user.firstName.charAt(0) + user.lastName.charAt(0)
}
