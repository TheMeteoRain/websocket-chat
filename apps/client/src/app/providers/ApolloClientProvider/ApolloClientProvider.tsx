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
import { useHistory } from 'react-router-dom'

const {
  API_SCHEME_WS,
  API_SCHEME_HTTP,
  API_PORT,
  API_HOST,
  API_ENDPOINT,
} = process.env

export const ApolloClientProvider: React.FC = ({ children }) => {
  const [token] = useSessionStorageValue('token', null)
  const history = useHistory()

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
        ...(token ? { Authorization: `Bearer ${token}` } : null),
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
      history.push('/register')
    }
  })

  const apolloLink = ApolloLink.split(
    hasSubscriptionOperation,
    new WebSocketLink({
      uri: `${API_SCHEME_WS}://${API_HOST}:${API_PORT}/${API_ENDPOINT}`,
      options: {
        reconnect: true,
        connectionParams: {
          uuid: faker.random.uuid(),
          ...(token ? { Authorization: `Bearer ${token}` } : null),
        },
      },
    }),
    new HttpLink({
      uri: `${API_SCHEME_HTTP}://${API_HOST}:${API_PORT}/${API_ENDPOINT}`,
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
