import React from 'react'
import { Header } from '@src/components'
import { useSocial } from '@src/contexts'

export type HeaderContainerProps = unknown

export const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const { current_member, logout } = useSocial()

  return <Header user={current_member} logOutFn={logout} />
}
