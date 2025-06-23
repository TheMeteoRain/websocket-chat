import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeISOResolver, UUIDResolver } from 'graphql-scalars'
import typeDefs from './channel.graphql'
import GraphQLContext from '../../types/GraphQLContext'
import * as channelService from '../../services/channelService'
import keysToCamelCase from '../../utils/keysToCamelCase'
import pgPubSub from '../../config/pgPubSub'

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
          console.log(`graphql:user:${context.memberId}:channel`)
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
