import * as Types from '@mete/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateMessageMutationVariables = Types.Exact<{
  channelId: Types.Scalars['UUID'];
  memberId: Types.Scalars['UUID'];
  text: Types.Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'CreateMessagePayload', message?: { __typename?: 'Message', id: any, text: string, channelId?: any | null | undefined, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } | null | undefined };


export const CreateMessageDocument = gql`
    mutation CreateMessage($channelId: UUID!, $memberId: UUID!, $text: String!) {
  createMessage(
    input: {message: {channelId: $channelId, memberId: $memberId, text: $text}}
  ) {
    message {
      id
      text
      channelId
      memberId
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      memberId: // value for 'memberId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;