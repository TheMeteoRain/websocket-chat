import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MessagesByChannelIdQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type MessagesByChannelIdQuery = { __typename?: 'Query', channelById?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', nodeId: string, id: any, text: string, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> } } | null | undefined };


export const MessagesByChannelIdDocument = gql`
    query MessagesByChannelId($id: UUID!) {
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
 * __useMessagesByChannelIdQuery__
 *
 * To run a query within a React component, call `useMessagesByChannelIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesByChannelIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesByChannelIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMessagesByChannelIdQuery(baseOptions: Apollo.QueryHookOptions<MessagesByChannelIdQuery, MessagesByChannelIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesByChannelIdQuery, MessagesByChannelIdQueryVariables>(MessagesByChannelIdDocument, options);
      }
export function useMessagesByChannelIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesByChannelIdQuery, MessagesByChannelIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesByChannelIdQuery, MessagesByChannelIdQueryVariables>(MessagesByChannelIdDocument, options);
        }
export type MessagesByChannelIdQueryHookResult = ReturnType<typeof useMessagesByChannelIdQuery>;
export type MessagesByChannelIdLazyQueryHookResult = ReturnType<typeof useMessagesByChannelIdLazyQuery>;
export type MessagesByChannelIdQueryResult = Apollo.QueryResult<MessagesByChannelIdQuery, MessagesByChannelIdQueryVariables>;