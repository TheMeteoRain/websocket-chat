import * as Types from '@root/types/lib/models/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentMemberQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentMemberQuery = { __typename?: 'Query', currentMember?: { __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null };


export const CurrentMemberDocument = gql`
    query CurrentMember {
  currentMember {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useCurrentMemberQuery__
 *
 * To run a query within a React component, call `useCurrentMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentMemberQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentMemberQuery(baseOptions?: Apollo.QueryHookOptions<CurrentMemberQuery, CurrentMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentMemberQuery, CurrentMemberQueryVariables>(CurrentMemberDocument, options);
      }
export function useCurrentMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentMemberQuery, CurrentMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentMemberQuery, CurrentMemberQueryVariables>(CurrentMemberDocument, options);
        }
export type CurrentMemberQueryHookResult = ReturnType<typeof useCurrentMemberQuery>;
export type CurrentMemberLazyQueryHookResult = ReturnType<typeof useCurrentMemberLazyQuery>;
export type CurrentMemberQueryResult = Apollo.QueryResult<CurrentMemberQuery, CurrentMemberQueryVariables>;