import * as Types from '@rally/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelsByMemberIdQueryVariables = Types.Exact<{
  memberId: Types.Scalars['UUID']['input'];
}>;


export type ChannelsByMemberIdQuery = { __typename?: 'Query', channelsByMemberId: Array<{ __typename?: 'Channel', id: string, createdAt: string, updatedAt: string, members: Array<{ __typename?: 'Member', id: string, firstName: string, lastName: string }> }> };


export const ChannelsByMemberIdDocument = gql`
    query ChannelsByMemberId($memberId: UUID!) {
  channelsByMemberId(memberId: $memberId) {
    id
    createdAt
    updatedAt
    members {
      id
      firstName
      lastName
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
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useChannelsByMemberIdQuery(baseOptions: Apollo.QueryHookOptions<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables> & ({ variables: ChannelsByMemberIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>(ChannelsByMemberIdDocument, options);
      }
export function useChannelsByMemberIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>(ChannelsByMemberIdDocument, options);
        }
export function useChannelsByMemberIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>(ChannelsByMemberIdDocument, options);
        }
export type ChannelsByMemberIdQueryHookResult = ReturnType<typeof useChannelsByMemberIdQuery>;
export type ChannelsByMemberIdLazyQueryHookResult = ReturnType<typeof useChannelsByMemberIdLazyQuery>;
export type ChannelsByMemberIdSuspenseQueryHookResult = ReturnType<typeof useChannelsByMemberIdSuspenseQuery>;
export type ChannelsByMemberIdQueryResult = Apollo.QueryResult<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>;