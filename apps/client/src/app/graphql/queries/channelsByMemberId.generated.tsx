import * as Types from '@root/types/lib/models/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelsByMemberIdQueryVariables = Types.Exact<{
  memberId: Types.Scalars['UUID']['input'];
}>;


export type ChannelsByMemberIdQuery = { __typename?: 'Query', channelsByMemberId: Array<{ __typename?: 'Channel', id: any, createdAt: any, updatedAt: any, members: Array<{ __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null>, messages: Array<{ __typename?: 'Message', id?: any | null, text?: string | null, memberId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null> } | null> };


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