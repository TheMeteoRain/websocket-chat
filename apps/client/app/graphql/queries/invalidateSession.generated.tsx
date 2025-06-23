import * as Types from '@rally/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvalidateSessionQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type InvalidateSessionQuery = { __typename?: 'Query', invalidateSession?: boolean | null };


export const InvalidateSessionDocument = gql`
    query InvalidateSession($token: String!) {
  invalidateSession(token: $token)
}
    `;

/**
 * __useInvalidateSessionQuery__
 *
 * To run a query within a React component, call `useInvalidateSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvalidateSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvalidateSessionQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useInvalidateSessionQuery(baseOptions: Apollo.QueryHookOptions<InvalidateSessionQuery, InvalidateSessionQueryVariables> & ({ variables: InvalidateSessionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvalidateSessionQuery, InvalidateSessionQueryVariables>(InvalidateSessionDocument, options);
      }
export function useInvalidateSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvalidateSessionQuery, InvalidateSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvalidateSessionQuery, InvalidateSessionQueryVariables>(InvalidateSessionDocument, options);
        }
export function useInvalidateSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InvalidateSessionQuery, InvalidateSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InvalidateSessionQuery, InvalidateSessionQueryVariables>(InvalidateSessionDocument, options);
        }
export type InvalidateSessionQueryHookResult = ReturnType<typeof useInvalidateSessionQuery>;
export type InvalidateSessionLazyQueryHookResult = ReturnType<typeof useInvalidateSessionLazyQuery>;
export type InvalidateSessionSuspenseQueryHookResult = ReturnType<typeof useInvalidateSessionSuspenseQuery>;
export type InvalidateSessionQueryResult = Apollo.QueryResult<InvalidateSessionQuery, InvalidateSessionQueryVariables>;