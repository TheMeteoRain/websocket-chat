import {
  ApolloClient as OriginalApolloClient,
  ApolloLink,
  HttpLink,
  split,
  type NormalizedCacheObject,
  type Operation,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { cache } from './cache'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'
import {
  createApolloLoaderHandler,
  ApolloClient,
} from '@apollo/client-integration-react-router'
import Cookies from 'js-cookie'
import getCookieValue from '../../utils/getCookieValue'

const {
  VITE_NX_API_SCHEME_WS,
  VITE_NX_API_SCHEME_HTTP,
  VITE_NX_API_HOST,
  VITE_NX_API_HOST_SSR,
  VITE_NX_API_ENDPOINT,
  VITE_NX_API_PORT,
  VITE_NX_API_URL,
  VITE_NX_API_HTTP_URL,
  VITE_NX_API_WS_URL,
  MODE,
} = import.meta.env

const API_URL = (protocol: 'ws' | 'wss' | 'http' | 'https', host: string) =>
  protocol === 'http' ? VITE_NX_API_HTTP_URL : VITE_NX_API_WS_URL

const hasSubscriptionOperation = ({ query: { definitions } }: Operation) =>
  definitions.some(
    (definition) =>
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  )

const authMiddleware = new ApolloLink((operation, forward) => {
  const authorization = Cookies.get('token')

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
    },
  }))

  return forward(operation)
})

const newAuthMiddleware = (authorization?: string) => {
  return new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
      },
    }))

    return forward(operation)
  })
}

const refreshAuthMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    // console.log(context?.request?.headers)
    // const cookieHeader = context?.request?.headers.get('cookie') || ''
    // const authorization = getCookieValue(cookieHeader, 'token')
    // if (typeof window !== 'undefined' && authorization) {
    //   sessionStorage.setItem('token', authorization)
    // }

    return response
  })
})

const logoutLink = onError((error) => {
  loadDevMessages()
  loadErrorMessages()
  if (
    error.networkError?.message.includes('JWTExpired') ||
    (error.graphQLErrors?.some(
      // @ts-expect-error: TODO
      ({ extensions, message, originalError }) =>
        extensions?.code === 'invalid-jwt' ||
        // @ts-expect-error: TODO
        extensions?.originalError?.['message']?.includes('jwt expired')
    ) &&
      typeof window !== 'undefined')
  ) {
    sessionStorage.removeItem('token')
    // TODO: logout request()
  }
})

const wsLink = ({ authorization, host }: LinkOptions) =>
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: API_URL(VITE_NX_API_SCHEME_WS, host),
          shouldRetry: () => true,
          connectionParams: () => {
            if (authorization) {
              return {
                authorization: `Bearer ${authorization}`,
              }
            }

            return {}
          },
        })
      )
    : null

const httpLink = (host: string) =>
  new HttpLink({
    uri: API_URL(VITE_NX_API_SCHEME_HTTP, host),
    credentials: 'include',
  })

type LinkOptions = {
  host: string
  authorization?: string
}
const link = ({ authorization, host }: LinkOptions) => {
  const ws = wsLink({ authorization, host })
  if (typeof window !== 'undefined' && ws != null) {
    return split(hasSubscriptionOperation, ws, httpLink(host))
  }

  return httpLink(host)
}

export const newApolloClientSSR: (request: Request) => ApolloClient = (
  request
) => {
  const cookieHeader = request.headers.get('cookie') || ''
  const authorization = getCookieValue(cookieHeader, 'token')

  return new ApolloClient({
    link: ApolloLink.from([
      newAuthMiddleware(authorization),
      refreshAuthMiddleware,
      logoutLink,
      link({ authorization, host: VITE_NX_API_HOST_SSR }),
    ]),
    cache,
    ssrMode: true,
    devtools: {
      enabled: MODE === 'development',
    },
  })
}

export const newApolloClient = (authorization?: string): ApolloClient =>
  new ApolloClient({
    link: ApolloLink.from([
      authMiddleware,
      refreshAuthMiddleware,
      logoutLink,
      link({ authorization, host: VITE_NX_API_HOST }),
    ]),
    cache,
    ssrMode: false,
    devtools: {
      enabled: MODE === 'development',
    },
  })

export const apolloLoader = createApolloLoaderHandler(newApolloClientSSR)
