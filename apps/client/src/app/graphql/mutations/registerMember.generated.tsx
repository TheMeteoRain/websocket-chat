import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegisterMemberMutationVariables = Types.Exact<{
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type RegisterMemberMutation = { __typename?: 'Mutation', registerMember?: { __typename?: 'RegisterMemberPayload', member?: { __typename?: 'Member', nodeId: string, id: any, firstName: string, lastName: string } | null | undefined } | null | undefined };


export const RegisterMemberDocument = gql`
    mutation RegisterMember($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  registerMember(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    member {
      nodeId
      id
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useRegisterMemberMutation__
 *
 * To run a mutation, you first call `useRegisterMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMemberMutation, { data, loading, error }] = useRegisterMemberMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMemberMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMemberMutation, RegisterMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMemberMutation, RegisterMemberMutationVariables>(RegisterMemberDocument, options);
      }
export type RegisterMemberMutationHookResult = ReturnType<typeof useRegisterMemberMutation>;
export type RegisterMemberMutationResult = Apollo.MutationResult<RegisterMemberMutation>;
export type RegisterMemberMutationOptions = Apollo.BaseMutationOptions<RegisterMemberMutation, RegisterMemberMutationVariables>;