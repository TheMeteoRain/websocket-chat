import { embed, gql, makeExtendSchemaPlugin } from 'postgraphile'

const currentUserTopicFromContext = async (_args, context, _resolveInfo) => {
  if (context.jwtClaims.member_id) {
    return `graphql:user:${context.jwtClaims.member_id}`
  } else {
    throw new Error("You're not logged in")
  }
}

const currentUserTopicFromContextForChannel = async (
  _args,
  context,
  _resolveInfo
) => {
  if (context.jwtClaims.member_id) {
    return `graphql:user:${context.jwtClaims.member_id}:channel`
  } else {
    throw new Error("You're not logged in")
  }
}

const currentUserTopicFromContextForMessage = async (
  args,
  context,
  _resolveInfo
) => {
  if (context.jwtClaims.member_id) {
    return `graphql:channel:${args.input.channelId}`
  } else {
    throw new Error("You're not logged in")
  }
}

export default makeExtendSchemaPlugin(({ pgSql: sql }) => ({
  typeDefs: gql`
    type UserSubscriptionPayload {
      # This is populated by our resolver below
      members: [Member]

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: String
    }

    type ChannelSubscriptionPayload {
      # This is populated by our resolver below
      channel: Channel

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: String
    }

    type MessageSubscriptionPayload {
      # This is populated by our resolver below
      message: Message

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: String
    }

    type HelloSubscriptionPayload {
      # This is populated by our resolver below
      hello: String

      # This is returned directly from the PostgreSQL subscription payload (JSON object)
      event: String
    }
    input MessageSubscriptionInput {
      channelId: UUID!
  }

    extend type Subscription {
      """
      Triggered when the current user's data changes:

      - direct modifications to the user
      - when their organization membership changes
      """
      newChannel: ChannelSubscriptionPayload
        @pgSubscription(topic: ${embed(currentUserTopicFromContextForChannel)})
      newMessage(input: MessageSubscriptionInput!): MessageSubscriptionPayload
        @pgSubscription(topic: ${embed(currentUserTopicFromContextForMessage)})
    }
  `,

  resolvers: {
    ChannelSubscriptionPayload: {
      // This method finds the user from the database based on the event
      // published by PostgreSQL.
      //
      // In a future release, we hope to enable you to replace this entire
      // method with a small schema directive above, should you so desire. It's
      // mostly boilerplate.
      async channel(
        event,
        _args,
        _context,
        { graphile: { selectGraphQLResultFromTable } }
      ) {
        const rows = await selectGraphQLResultFromTable(
          sql.fragment`public.channel`,
          (tableAlias, sqlBuilder) => {
            sqlBuilder.where(
              sql.fragment`${tableAlias}.id = ${sql.value(
                event.subject.channel_id
              )}`
            )
          }
        )

        return rows[0]
      },
    },
    MessageSubscriptionPayload: {
      // This method finds the user from the database based on the event
      // published by PostgreSQL.
      //
      // In a future release, we hope to enable you to replace this entire
      // method with a small schema directive above, should you so desire. It's
      // mostly boilerplate.
      async message(
        event,
        _args,
        _context,
        { graphile: { selectGraphQLResultFromTable } }
      ) {
        const rows = await selectGraphQLResultFromTable(
          sql.fragment`public.message`,
          (tableAlias, sqlBuilder) => {
            sqlBuilder.where(
              sql.fragment`${tableAlias}.id = ${sql.value(event.subject.id)}`
            )
          }
        )

        return rows[0]
      },
    },
  },
}))
