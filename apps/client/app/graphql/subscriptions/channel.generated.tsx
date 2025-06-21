import * as Types from '@rally/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ChannelSubscription = { __typename?: 'Subscription', newChannel?: { __typename?: 'Channel', id: string, createdAt: string, updatedAt: string, members: Array<{ __typename?: 'Member', id: string, firstName: string, lastName: string }>, messages: Array<{ __typename?: 'Message', id: string, text: string, memberId: string, createdAt: string, updatedAt: string }> } | null };


export const ChannelDocument = gql`
    subscription Channel {
  newChannel {
    id
    createdAt
    updatedAt
    members {
      id
      firstName
      lastName
    }
    messages {
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
 * __useChannelSubscription__
 *
 * To run a query within a React component, call `useChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChannelSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChannelSubscription, ChannelSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChannelSubscription, ChannelSubscriptionVariables>(ChannelDocument, options);
      }
export type ChannelSubscriptionHookResult = ReturnType<typeof useChannelSubscription>;
export type ChannelSubscriptionResult = Apollo.SubscriptionResult<ChannelSubscription>;