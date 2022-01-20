import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type ChannelSubscription = { __typename?: 'Subscription', newChannel?: { __typename?: 'ChannelSubscriptionPayload', event?: string | null | undefined, channel?: { __typename?: 'Channel', channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', channelByChannelId?: { __typename?: 'Channel', channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', nodeId: string, channelId: any, channelByChannelId?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', id: any, nodeId: string, memberId?: any | null | undefined, text: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> }, channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', memberByMemberId?: { __typename?: 'Member', firstName: string, lastName: string, id: any, nodeId: string } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined };


export const ChannelDocument = gql`
    subscription Channel($id: UUID!) {
  newChannel {
    event
    channel {
      channelMembersByChannelId(filter: {memberId: {notEqualTo: $id}}) {
        nodes {
          channelByChannelId {
            channelMembersByChannelId(filter: {memberId: {notEqualTo: $id}}) {
              nodes {
                nodeId
                channelId
                channelByChannelId {
                  messagesByChannelId(last: 50) {
                    nodes {
                      id
                      nodeId
                      memberId
                      text
                      createdAt
                      updatedAt
                    }
                  }
                  channelMembersByChannelId(filter: {memberId: {notEqualTo: $id}}) {
                    nodes {
                      memberByMemberId {
                        firstName
                        lastName
                        id
                        nodeId
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChannelSubscription, ChannelSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChannelSubscription, ChannelSubscriptionVariables>(ChannelDocument, options);
      }
export type ChannelSubscriptionHookResult = ReturnType<typeof useChannelSubscription>;
export type ChannelSubscriptionResult = Apollo.SubscriptionResult<ChannelSubscription>;