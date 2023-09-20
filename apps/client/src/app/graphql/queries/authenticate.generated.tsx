import * as Types from '@root/types/lib/models/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthenticateQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type AuthenticateQuery = { __typename?: 'Query', authenticate?: string | null };


export const AuthenticateDocument = gql`
    query Authenticate($email: String!, $password: String!) {
  authenticate(email: $email, password: $password)
}
    `;

/**
 * __useAuthenticateQuery__
 *
 * To run a query within a React component, call `useAuthenticateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateQuery(baseOptions: Apollo.QueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, options);
      }
export function useAuthenticateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, options);
        }
export type AuthenticateQueryHookResult = ReturnType<typeof useAuthenticateQuery>;
export type AuthenticateLazyQueryHookResult = ReturnType<typeof useAuthenticateLazyQuery>;
export type AuthenticateQueryResult = Apollo.QueryResult<AuthenticateQuery, AuthenticateQueryVariables>;