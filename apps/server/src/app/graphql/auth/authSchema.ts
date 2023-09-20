import { makeExecutableSchema } from '@graphql-tools/schema'
import auth, { AuthenticateInput } from '@src/app/services/auth'
import GraphQLContext from '@src/app/types/GraphQLContext'
import { DateTimeISOResolver, UUIDResolver } from 'graphql-scalars'
import typeDefs from './auth.graphql'

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    UUID: UUIDResolver,
    DateTimeISO: DateTimeISOResolver,
    Query: {
      authenticate: {
        resolve: async (
          source,
          args: AuthenticateInput,
          context: GraphQLContext,
          info
        ) => {
          const { email, password } = args
          return await auth.authenticate({ email, password })
        },
      },
    },
  },
})
