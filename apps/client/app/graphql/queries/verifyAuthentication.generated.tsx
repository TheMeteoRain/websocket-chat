import * as Types from '@rally/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VerifyAuthenticationQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type VerifyAuthenticationQuery = { __typename?: 'Query', verifyAuthentication?: boolean | null };


export const VerifyAuthenticationDocument = gql`
    query VerifyAuthentication($token: String!) {
  verifyAuthentication(token: $token)
}
    `;

/**
 * __useVerifyAuthenticationQuery__
 *
 * To run a query within a React component, call `useVerifyAuthenticationQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyAuthenticationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyAuthenticationQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyAuthenticationQuery(baseOptions: Apollo.QueryHookOptions<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables> & ({ variables: VerifyAuthenticationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables>(VerifyAuthenticationDocument, options);
      }
export function useVerifyAuthenticationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables>(VerifyAuthenticationDocument, options);
        }
export function useVerifyAuthenticationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables>(VerifyAuthenticationDocument, options);
        }
export type VerifyAuthenticationQueryHookResult = ReturnType<typeof useVerifyAuthenticationQuery>;
export type VerifyAuthenticationLazyQueryHookResult = ReturnType<typeof useVerifyAuthenticationLazyQuery>;
export type VerifyAuthenticationSuspenseQueryHookResult = ReturnType<typeof useVerifyAuthenticationSuspenseQuery>;
export type VerifyAuthenticationQueryResult = Apollo.QueryResult<VerifyAuthenticationQuery, VerifyAuthenticationQueryVariables>;