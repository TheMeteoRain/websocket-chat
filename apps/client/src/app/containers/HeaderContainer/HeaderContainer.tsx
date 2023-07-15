import React from 'react'
import { Header } from '@src/components'
import { useAuth } from '@src/hooks/useAuth'

export type HeaderContainerProps = unknown

export const HeaderContainer: React.FC<HeaderContainerProps> = () => {
  const { member, logout } = useAuth()

  return <Header user={member} logOutFn={logout} />
}
