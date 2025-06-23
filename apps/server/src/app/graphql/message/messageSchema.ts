import { makeExecutableSchema } from '@graphql-tools/schema'
import { DateTimeISOResolver, UUIDResolver } from 'graphql-scalars'
import typeDefs from './message.graphql'
import messageService, {
  CreateMessageInput,
  MessageByIdInput,
  MessageByMemberIdInput,
  MessagesByChannelId,
} from '../../services/messageService'
import GraphQLContext from '../../types/GraphQLContext'
import keysToCamelCase from '../../utils/keysToCamelCase'
import pgPubSub from '../../config/pgPubSub'

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: {
    UUID: UUIDResolver,
    DateTimeISO: DateTimeISOResolver,
    Query: {
      messageById: {
        // not working
        resolve: async (
          source,
          args: MessageByIdInput,
          context: GraphQLContext,
          info
        ) => {
          const message = await messageService.messageById({
            id: args.id,
          })

          return message
        },
      },
      messagesByChannelId: {
        resolve: async (
          source,
          args: MessagesByChannelId,
          context: GraphQLContext,
          info
        ) => {
          const messages = await messageService.messagesByChannelId({
            channelId: args.channelId,
          })

          return messages
        },
      },
      messagesByMemberId: {
        resolve: async (
          source,
          args: MessageByMemberIdInput,
          context: GraphQLContext,
          info
        ) => {
          const messages = await messageService.messagesByMemberId({
            memberId: args.memberId,
          })

          return messages
        },
      },
    },
    Mutation: {
      createMessage: {
        resolve: async (
          source,
          args: CreateMessageInput,
          context: GraphQLContext,
          info
        ) => {
          const { memberId, channelId, text } = args

          const message = await messageService.createMessage({
            channelId,
            memberId,
            text,
          })

          return message
        },
      },
    },
    Subscription: {
      newMessage: {
        resolve: (source, args, context: GraphQLContext, info) => {
          return keysToCamelCase(source.subject)
        },
        subscribe: (source, args, context: GraphQLContext, info) => {
          return pgPubSub.asyncIterator(`graphql:messages:${context.memberId}`)
        },
      },
    },
  },
})
