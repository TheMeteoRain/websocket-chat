import * as Types from '@rally/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NewMessageSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'Message', id: string, text: string, channelId: string, memberId: string, createdAt: string, updatedAt: string } | null };


export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    id
    text
    channelId
    memberId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, options);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;