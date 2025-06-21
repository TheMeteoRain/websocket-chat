import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLResolveInfo } from 'graphql'
import { DateTimeISOResolver, UUIDResolver } from 'graphql-scalars'
import { IncomingMessage, ServerResponse } from 'http'
import auth, {
  AuthenticateInput,
  InvalidateSessionInput,
  VerifyAuthenticationInput,
} from '../../services/auth'
import typeDefs from './auth.graphql'

export type AuthenticateArgs = {
  memberId: string
}

export type VerifyAuthenticationArgs = {
  token: string
}
export type InvalidateSessionArgs = {
  token: string
}

export type GraphQLContext<
  Params extends Record<string, unknown>,
  Args extends Record<string, unknown>
> = {
  req: IncomingMessage
  res: ServerResponse
  waitUntil?: (maybePromise: Promise<unknown>) => void
  request?: Request
  params?: {
    operationName?: string
    variables?: Params
    query?: string
  }
} & Partial<Args>

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    UUID: UUIDResolver,
    DateTimeISO: DateTimeISOResolver,
    Query: {
      authenticate: {
        resolve: async (
          source: unknown,
          args: AuthenticateInput,
          context: GraphQLContext<AuthenticateInput, AuthenticateArgs>,
          info: GraphQLResolveInfo
        ) => {
          const { email, password } = args
          const token = await auth.authenticate({ email, password })

          if (token) {
            context.res.setHeader(
              'Set-Cookie',
              `token=${token}; Path=/; Max-Age=${
                2 * 24 * 60 * 60
              }; SameSite=None; HttpOnly; Secure`
            )
            context.res.setHeader('Authorization', `Bearer ${token}`)
          }

          return token
        },
      },
      verifyAuthentication: {
        resolve: async (
          source: unknown,
          args: VerifyAuthenticationInput,
          context: GraphQLContext<
            VerifyAuthenticationInput,
            VerifyAuthenticationArgs
          >,
          info: GraphQLResolveInfo
        ) => {
          const { token } = args
          const result = await auth.verifyAuthentication({ token })

          if (!result) {
            console.debug('REMOVE TOKEN')
            context.res.setHeader(
              'Set-Cookie',
              'token=; Path=/; Max-Age=0; SameSite=None; HttpOnly; Secure'
            )
            context.res.removeHeader('Authorization')
          }

          return result
        },
      },
      invalidateSession: {
        resolve: async (
          source: unknown,
          args: VerifyAuthenticationInput,
          context: GraphQLContext<
            InvalidateSessionInput,
            InvalidateSessionArgs
          >,
          info: GraphQLResolveInfo
        ) => {
          const { token } = args

          const result = await auth.invalidateSession({ token })

          console.debug('REMOVE TOKEN')
          context.res.setHeader(
            'Set-Cookie',
            'token=; Path=/; Max-Age=0; SameSite=None; HttpOnly; Secure'
          )
          context.res.removeHeader('Authorization')

          return result
        },
      },
    },
  },
})
