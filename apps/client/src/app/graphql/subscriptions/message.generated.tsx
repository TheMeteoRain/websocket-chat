import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MessageSubscriptionVariables = Types.Exact<{
  channelId: Types.Scalars['UUID'];
}>;


export type MessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'MessageSubscriptionPayload', message?: { __typename?: 'Message', nodeId: string, id: any, text: string, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } | null | undefined };


export const MessageDocument = gql`
    subscription Message($channelId: UUID!) {
  newMessage(input: {channelId: $channelId}) {
    message {
      nodeId
      id
      text
      memberId
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, options);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;