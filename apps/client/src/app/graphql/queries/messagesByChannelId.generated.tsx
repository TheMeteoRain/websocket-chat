import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GueryMessagesByChannelIdQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type GueryMessagesByChannelIdQuery = { __typename?: 'Query', channelById?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', nodeId: string, id: any, text: string, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> } } | null | undefined };


export const GueryMessagesByChannelIdDocument = gql`
    query GueryMessagesByChannelId($id: UUID!) {
  channelById(id: $id) {
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
 * __useGueryMessagesByChannelIdQuery__
 *
 * To run a query within a React component, call `useGueryMessagesByChannelIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGueryMessagesByChannelIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGueryMessagesByChannelIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGueryMessagesByChannelIdQuery(baseOptions: Apollo.QueryHookOptions<GueryMessagesByChannelIdQuery, GueryMessagesByChannelIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GueryMessagesByChannelIdQuery, GueryMessagesByChannelIdQueryVariables>(GueryMessagesByChannelIdDocument, options);
      }
export function useGueryMessagesByChannelIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GueryMessagesByChannelIdQuery, GueryMessagesByChannelIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GueryMessagesByChannelIdQuery, GueryMessagesByChannelIdQueryVariables>(GueryMessagesByChannelIdDocument, options);
        }
export type GueryMessagesByChannelIdQueryHookResult = ReturnType<typeof useGueryMessagesByChannelIdQuery>;
export type GueryMessagesByChannelIdLazyQueryHookResult = ReturnType<typeof useGueryMessagesByChannelIdLazyQuery>;
export type GueryMessagesByChannelIdQueryResult = Apollo.QueryResult<GueryMessagesByChannelIdQuery, GueryMessagesByChannelIdQueryVariables>;