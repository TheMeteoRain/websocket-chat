import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Operation,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { onError } from '@apollo/client/link/error'
import { useSessionStorageValue } from '@react-hookz/web'
import faker from 'faker'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { cache } from './cache'
import { createClient } from 'graphql-ws'

const { NX_API_SCHEME_WS, NX_API_SCHEME_HTTP, NX_API_HOST, NX_API_ENDPOINT } =
  // @ts-ignore
  process.env

export interface ApolloClientProviderProps {
  children: React.ReactNode
}

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = (
  props
) => {
  const { children } = props
  const [token] = useSessionStorageValue('token', null)
  // const navigate = useNavigate()

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
        ({ extensions, message }) =>
          extensions?.code === 'invalid-jwt' || message.includes('JWTExpired')
      )
    ) {
      // navigate('/register')
    }
  })

  const apolloLink = ApolloLink.split(
    hasSubscriptionOperation,
    new GraphQLWsLink(
      createClient({
        url: `${NX_API_SCHEME_WS}://localhost:4300/${NX_API_ENDPOINT}`,
        shouldRetry: () => true,
        connectionParams: () => {
          return {
            authorization: `Bearer ${token}`,
          }
        },
      })
    ),
    new HttpLink({
      uri: `${NX_API_SCHEME_HTTP}://${NX_API_HOST}/${NX_API_ENDPOINT}`,
    })
  )

  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([authMiddleware, apolloLink]),
    cache,
    connectToDevTools: true,
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default ApolloClientProvider
