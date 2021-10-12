import * as Types from '../../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MutationMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.CreateQuestionInput>;
}>;


export type MutationMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'CreateQuestionPayload', createdUuid: string } };


export const MutationDocument = gql`
    mutation Mutation($input: CreateQuestionInput) {
  createQuestion(input: $input) {
    createdUuid
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;