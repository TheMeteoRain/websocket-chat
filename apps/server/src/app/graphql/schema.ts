import { delegateToSchema } from '@graphql-tools/delegate'
import { stitchSchemas } from '@graphql-tools/stitch'
import { authSchema } from './auth'
import { channelSchema } from './channel'
import typeDefs from './extend.graphql'
import { memberSchema } from './member'
import { messageSchema } from './message'

const schema2 = stitchSchemas({
  subschemas: [
    { schema: memberSchema },
    { schema: messageSchema },
    { schema: authSchema },
    { schema: channelSchema },
  ],
  typeDefs,
  resolvers: {
    Member: {
      channels: {
        selectionSet: `{ id }`,
        resolve: (source, args, context, info) => {
          return delegateToSchema({
            schema: channelSchema,
            fieldName: 'channelsByMemberId',
            args: { memberId: source.id },
            context,
            info,
          })
        },
      },
    },
    Channel: {
      members: {
        selectionSet: `{ id }`,
        resolve: (source, args, context, info) => {
          return delegateToSchema({
            schema: memberSchema,
            fieldName: 'membersByChannelId',
            args: { channelId: source.id },
            context,
            info,
          })
        },
      },
      messages: {
        selectionSet: `{ id }`,
        resolve: (source, args, context, info) => {
          return delegateToSchema({
            schema: messageSchema,
            fieldName: 'messagesByChannelId',
            args: { channelId: source.id },
            context,
            info,
          })
        },
      },
    },
  },
})

export default schema2
