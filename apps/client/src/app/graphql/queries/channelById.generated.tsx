import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelByIdQueryVariables = Types.Exact<{
  channelId: Types.Scalars['UUID'];
  memberId: Types.Scalars['UUID'];
}>;


export type ChannelByIdQuery = { __typename?: 'Query', channelById?: { __typename?: 'Channel', channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', memberByMemberId?: { __typename?: 'Member', nodeId: string, id: any, firstName: string, lastName: string } | null | undefined } | null | undefined> }, messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', nodeId: string, id: any, text: string, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> } } | null | undefined };


export const ChannelByIdDocument = gql`
    query ChannelById($channelId: UUID!, $memberId: UUID!) {
  channelById(id: $channelId) {
    channelMembersByChannelId(filter: {memberId: {notEqualTo: $memberId}}) {
      nodes {
        memberByMemberId {
          nodeId
          id
          firstName
          lastName
        }
      }
    }
    messagesByChannelId(orderBy: UPDATED_AT_ASC) {
      nodes {
        nodeId
        id
        text
        memberId
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useChannelByIdQuery__
 *
 * To run a query within a React component, call `useChannelByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelByIdQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useChannelByIdQuery(baseOptions: Apollo.QueryHookOptions<ChannelByIdQuery, ChannelByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelByIdQuery, ChannelByIdQueryVariables>(ChannelByIdDocument, options);
      }
export function useChannelByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelByIdQuery, ChannelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelByIdQuery, ChannelByIdQueryVariables>(ChannelByIdDocument, options);
        }
export type ChannelByIdQueryHookResult = ReturnType<typeof useChannelByIdQuery>;
export type ChannelByIdLazyQueryHookResult = ReturnType<typeof useChannelByIdLazyQuery>;
export type ChannelByIdQueryResult = Apollo.QueryResult<ChannelByIdQuery, ChannelByIdQueryVariables>;