import React from 'react'
import { Header } from '@src/components'
import { useAuth } from '@src/hooks/useAuth'

export type HeaderContainerProps = unknown

export const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const { current_member, logout } = useAuth()

  return <Header user={current_member} logOutFn={logout} />
}
