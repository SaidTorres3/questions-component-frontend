import * as Types from '../../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type EditQuestionMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.EditQuestionInput>;
}>;


export type EditQuestionMutation = { __typename?: 'Mutation', editQuestion: { __typename?: 'EditQuestionPayload', questionUuid: string } };

export type GetQuestionQueryVariables = Types.Exact<{
  input: Types.GetQuestionInput;
}>;


export type GetQuestionQuery = { __typename?: 'Query', getQuestion: { __typename?: 'GetQuestionPayload', question: { __typename?: 'Question', uuid: string, imgUrl?: string | null | undefined, es: string, en: string, answers: Array<{ __typename?: 'Answer', uuid: string, en: string, es: string, value: any }>, posted_answers: Array<{ __typename?: 'Posted_Answer', answer: { __typename?: 'Answer', value: any } }> } } };

export type DeleteQuestionMutationVariables = Types.Exact<{
  input: Types.DeleteQuestionInput;
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion: { __typename?: 'DeleteQuestionPayload', deletedUuid: string } };


export const EditQuestionDocument = gql`
    mutation EditQuestion($input: EditQuestionInput) {
  editQuestion(input: $input) {
    questionUuid
  }
}
    `;
export type EditQuestionMutationFn = Apollo.MutationFunction<EditQuestionMutation, EditQuestionMutationVariables>;

/**
 * __useEditQuestionMutation__
 *
 * To run a mutation, you first call `useEditQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editQuestionMutation, { data, loading, error }] = useEditQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditQuestionMutation(baseOptions?: Apollo.MutationHookOptions<EditQuestionMutation, EditQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditQuestionMutation, EditQuestionMutationVariables>(EditQuestionDocument, options);
      }
export type EditQuestionMutationHookResult = ReturnType<typeof useEditQuestionMutation>;
export type EditQuestionMutationResult = Apollo.MutationResult<EditQuestionMutation>;
export type EditQuestionMutationOptions = Apollo.BaseMutationOptions<EditQuestionMutation, EditQuestionMutationVariables>;
export const GetQuestionDocument = gql`
    query GetQuestion($input: GetQuestionInput!) {
  getQuestion(input: $input) {
    question {
      uuid
      imgUrl
      es
      en
      answers {
        uuid
        en
        es
        value
      }
      posted_answers {
        answer {
          value
        }
      }
    }
  }
}
    `;

/**
 * __useGetQuestionQuery__
 *
 * To run a query within a React component, call `useGetQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
      }
export function useGetQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionQuery, GetQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionQuery, GetQuestionQueryVariables>(GetQuestionDocument, options);
        }
export type GetQuestionQueryHookResult = ReturnType<typeof useGetQuestionQuery>;
export type GetQuestionLazyQueryHookResult = ReturnType<typeof useGetQuestionLazyQuery>;
export type GetQuestionQueryResult = Apollo.QueryResult<GetQuestionQuery, GetQuestionQueryVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
    deletedUuid
  }
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;