import * as Types from '../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ValidadeTokenMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.ValidadeTokenInput>;
}>;


export type ValidadeTokenMutation = { __typename?: 'Mutation', validadeToken?: { __typename?: 'ValidadeTokenPayloadSuccess', user: { __typename?: 'User', uuid: string, type: string, username: string } } | { __typename?: 'ValidadeTokenPayloadFail', message: string } | null | undefined };


export const ValidadeTokenDocument = gql`
    mutation validadeToken($input: ValidadeTokenInput) {
  validadeToken(input: $input) {
    ... on ValidadeTokenPayloadSuccess {
      user {
        uuid
        type
        username
      }
    }
    ... on ValidadeTokenPayloadFail {
      message
    }
  }
}
    `;
export type ValidadeTokenMutationFn = Apollo.MutationFunction<ValidadeTokenMutation, ValidadeTokenMutationVariables>;

/**
 * __useValidadeTokenMutation__
 *
 * To run a mutation, you first call `useValidadeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidadeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validadeTokenMutation, { data, loading, error }] = useValidadeTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useValidadeTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidadeTokenMutation, ValidadeTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidadeTokenMutation, ValidadeTokenMutationVariables>(ValidadeTokenDocument, options);
      }
export type ValidadeTokenMutationHookResult = ReturnType<typeof useValidadeTokenMutation>;
export type ValidadeTokenMutationResult = Apollo.MutationResult<ValidadeTokenMutation>;
export type ValidadeTokenMutationOptions = Apollo.BaseMutationOptions<ValidadeTokenMutation, ValidadeTokenMutationVariables>;