import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { newApolloClient } from './apolloClient'

export interface ApolloClientProviderProps {
  children: React.ReactNode
  authorization?: string
}

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = (
  props
) => {
  const { children, authorization } = props
  const apolloClient = newApolloClient(authorization)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default ApolloClientProvider
