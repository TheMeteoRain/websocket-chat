import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  NormalizedCacheObject,
  Operation,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { useSessionStorageValue } from '@react-hookz/web'
import { createClient } from 'graphql-ws'
import React from 'react'
import { cache } from './cache'

const {
  NX_API_SCHEME_WS,
  NX_API_SCHEME_HTTP,
  NX_API_HOST,
  NX_API_ENDPOINT,
  NX_API_PORT,
} = process.env

export interface ApolloClientProviderProps {
  children: React.ReactNode
}

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = (
  props
) => {
  const { children } = props
  const [token, _setToken, removeToken] = useSessionStorageValue('token', null)

  const hasSubscriptionOperation = ({ query: { definitions } }: Operation) =>
    definitions.some(
      (definition) =>
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    )

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    return forward(operation)
  })

  const logoutLink = onError((error) => {
    console.log('APOLLO ERROR!', error)

    if (
      error.networkError?.message.includes('JWTExpired') ||
      error.graphQLErrors?.some(
        ({ extensions, message, originalError }) =>
          extensions?.code === 'invalid-jwt' ||
          extensions?.originalError?.['message']?.includes('jwt expired')
      )
    ) {
      removeToken()
    }
  })

  const apolloLink = ApolloLink.split(
    hasSubscriptionOperation,
    new GraphQLWsLink(
      createClient({
        url: `${NX_API_SCHEME_WS}://${NX_API_HOST}:${NX_API_PORT}/${NX_API_ENDPOINT}`,
        shouldRetry: () => true,
        connectionParams: () => {
          return {
            authorization: `Bearer ${token}`,
          }
        },
      })
    ),
    new HttpLink({
      uri: `${NX_API_SCHEME_HTTP}://${NX_API_HOST}:${NX_API_PORT}/${NX_API_ENDPOINT}`,
    })
  )

  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([authMiddleware, logoutLink, apolloLink]),
    cache,
    connectToDevTools: true,
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default ApolloClientProvider
