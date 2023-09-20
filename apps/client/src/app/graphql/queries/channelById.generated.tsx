import * as Types from '@root/types/lib/models/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChannelByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID']['input'];
}>;


export type ChannelByIdQuery = { __typename?: 'Query', channelById?: { __typename?: 'Channel', id: any, createdAt: any, updatedAt: any, members: Array<{ __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null>, messages: Array<{ __typename?: 'Message', id?: any | null, text?: string | null, memberId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null> } | null };


export const ChannelByIdDocument = gql`
    query ChannelById($id: UUID!) {
  channelById(id: $id) {
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
 *      id: // value for 'id'
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