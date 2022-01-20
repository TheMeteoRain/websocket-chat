import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelsByMemberIdQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type ChannelsByMemberIdQuery = { __typename?: 'Query', memberById?: { __typename?: 'Member', channelMembersByMemberId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', nodeId: string, channelId: any, channelByChannelId?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', id: any, nodeId: string, memberId?: any | null | undefined, text: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> }, channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', memberByMemberId?: { __typename?: 'Member', firstName: string, lastName: string, id: any, nodeId: string } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined> } } | null | undefined };


export const ChannelsByMemberIdDocument = gql`
    query ChannelsByMemberId($id: UUID!) {
  memberById(id: $id) {
    channelMembersByMemberId {
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
    `;

/**
 * __useChannelsByMemberIdQuery__
 *
 * To run a query within a React component, call `useChannelsByMemberIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsByMemberIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsByMemberIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelsByMemberIdQuery(baseOptions: Apollo.QueryHookOptions<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>(ChannelsByMemberIdDocument, options);
      }
export function useChannelsByMemberIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>(ChannelsByMemberIdDocument, options);
        }
export type ChannelsByMemberIdQueryHookResult = ReturnType<typeof useChannelsByMemberIdQuery>;
export type ChannelsByMemberIdLazyQueryHookResult = ReturnType<typeof useChannelsByMemberIdLazyQuery>;
export type ChannelsByMemberIdQueryResult = Apollo.QueryResult<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>;