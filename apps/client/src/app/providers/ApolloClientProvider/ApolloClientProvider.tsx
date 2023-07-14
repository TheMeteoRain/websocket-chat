import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Operation,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import { useSessionStorageValue } from '@react-hookz/web'
import faker from 'faker'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const { NX_API_SCHEME_WS, NX_API_SCHEME_HTTP, NX_API_HOST, NX_API_ENDPOINT } =
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
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
    new WebSocketLink({
      uri: `${NX_API_SCHEME_WS}://${NX_API_HOST}/${NX_API_ENDPOINT}`,
      options: {
        reconnect: true,
        connectionParams: {
          uuid: faker.datatype.uuid(),
          ...(token ? { Authorization: `Bearer ${token}` } : null),
        },
      },
    }),
    new HttpLink({
      uri: `${NX_API_SCHEME_HTTP}://${NX_API_HOST}/${NX_API_ENDPOINT}`,
    })
  )

  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: ApolloLink.from([authMiddleware, apolloLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default ApolloClientProvider
