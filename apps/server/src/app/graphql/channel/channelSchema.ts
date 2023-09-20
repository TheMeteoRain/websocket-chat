import { makeExecutableSchema } from '@graphql-tools/schema'
import pgPubSub from '@src/app/config/pgPubSub'
import channelService from '@src/app/services/channelService'
import GraphQLContext from '@src/app/types/GraphQLContext'
import keysToCamelCase from '@src/app/utils/keysToCamelCase'
import { DateTimeISOResolver, UUIDResolver } from 'graphql-scalars'
import typeDefs from './channel.graphql'

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    UUID: UUIDResolver,
    DateTimeISO: DateTimeISOResolver,
    // ChannelMember: {
    //   channel: {
    //     selectionSet: `{ channelId }`,
    //     resolve: async (source, args, context, info) => {
    //       console.log({ source, args })
    //       return delegateToSchema({
    //         schema: channelSchema,
    //         fieldName: 'channelById',
    //         args: { id: source.channelId },
    //         context,
    //         info,
    //       })
    //     },
    //   },
    // },
    Query: {
      channelById: {
        resolve: async (source, args, context: GraphQLContext, info) => {
          const channel = await channelService.channelById({ id: args.id })

          return channel
        },
      },
      channelsByMemberId: {
        resolve: async (source, args, context: GraphQLContext, info) => {
          const channels = await channelService.channelsByMemberId({
            memberId: args.memberId,
          })

          return channels
        },
      },
    },
    Subscription: {
      newChannel: {
        resolve: (source, args, context: GraphQLContext, info) => {
          return keysToCamelCase(source.subject)
        },
        subscribe: (source, args, context: GraphQLContext, info) => {
          return pgPubSub.asyncIterator(
            `graphql:user:${context.memberId}:channel`
          )
        },
      },
      countdown: {
        subscribe: async function* (_, { from = 5 }) {
          for (let i = from; i >= 0; i--) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            yield { countdown: i }
          }
        },
      },
    },
  },
})
