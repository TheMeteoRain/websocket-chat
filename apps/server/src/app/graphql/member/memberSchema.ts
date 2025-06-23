import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeISOResolver, UUIDResolver } from 'graphql-scalars'
import typeDefs from './member.graphql'
import memberService, {
  CurrentMemberInput,
  MembersByChannelIdInput,
} from '../../services/memberService'
import GraphQLContext from '../../types/GraphQLContext'
import auth, { RegisteMemberInput } from '../../services/auth'

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    UUID: UUIDResolver,
    DateTimeISO: DateTimeISOResolver,
    Query: {
      memberById: {
        resolve: async (
          source,
          args: CurrentMemberInput,
          context: GraphQLContext,
          info
        ) => {
          const member = await memberService.currentMember({
            id: args.id,
          })

          return member
        },
      },
      membersByChannelId: {
        resolve: async (
          source,
          args: MembersByChannelIdInput,
          context: GraphQLContext,
          info
        ) => {
          const members = await memberService.membersByChannelId({
            channelId: args.channelId,
          })

          return members
        },
      },
      hello: {
        resolve: (source, args, context: GraphQLContext, info) => {
          const { memberId } = context
          return `hello ${memberId}`
        },
      },
      currentMember: {
        resolve: async (source, args, context: GraphQLContext, info) => {
          const member = await memberService.currentMember({
            // @ts-expect-error: TODO
            id: context.memberId,
          })

          return member
        },
      },
    },
    Mutation: {
      registerMember: {
        resolve: (
          source,
          args: RegisteMemberInput,
          context: GraphQLContext,
          info
        ) => {
          const { firstName, lastName, email, password } = args
          return auth.registerMember({ firstName, lastName, email, password })
        },
      },
    },
  },
})
