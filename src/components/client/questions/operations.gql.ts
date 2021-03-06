import * as Types from '../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetQuestionsQueryVariables = Types.Exact<{
  skip?: Types.Maybe<Types.Scalars['Int']>;
  take?: Types.Maybe<Types.Scalars['Int']>;
  sort?: Types.Maybe<Types.GetQuestionsSortInput>;
}>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestions: { __typename?: 'GetQuestionsPayload', total: number, skip: number, take: number, hasMore: boolean, items: Array<{ __typename?: 'Question', uuid: string, imgUrl?: string | null | undefined, en: string, es: string, answers: Array<{ __typename?: 'Answer', en: string, es: string, uuid: string, value: any }> }> } };

export type CreatePostedAnswersMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.CreatePostedAnswerInput>;
}>;


export type CreatePostedAnswersMutation = { __typename?: 'Mutation', createPostedAnswers: { __typename?: 'CreatePostedAnswerPayload', respondentUuid: string } };


export const GetQuestionsDocument = gql`
    query GetQuestions($skip: Int, $take: Int, $sort: GetQuestionsSortInput) {
  getQuestions(skip: $skip, take: $take, sort: $sort) {
    items {
      uuid
      imgUrl
      en
      es
      answers {
        en
        es
        uuid
        value
      }
    }
    total
    skip
    take
    hasMore
  }
}
    `;

/**
 * __useGetQuestionsQuery__
 *
 * To run a query within a React component, call `useGetQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
      }
export function useGetQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
        }
export type GetQuestionsQueryHookResult = ReturnType<typeof useGetQuestionsQuery>;
export type GetQuestionsLazyQueryHookResult = ReturnType<typeof useGetQuestionsLazyQuery>;
export type GetQuestionsQueryResult = Apollo.QueryResult<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const CreatePostedAnswersDocument = gql`
    mutation CreatePostedAnswers($input: CreatePostedAnswerInput) {
  createPostedAnswers(input: $input) {
    respondentUuid
  }
}
    `;
export type CreatePostedAnswersMutationFn = Apollo.MutationFunction<CreatePostedAnswersMutation, CreatePostedAnswersMutationVariables>;

/**
 * __useCreatePostedAnswersMutation__
 *
 * To run a mutation, you first call `useCreatePostedAnswersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostedAnswersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostedAnswersMutation, { data, loading, error }] = useCreatePostedAnswersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostedAnswersMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostedAnswersMutation, CreatePostedAnswersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostedAnswersMutation, CreatePostedAnswersMutationVariables>(CreatePostedAnswersDocument, options);
      }
export type CreatePostedAnswersMutationHookResult = ReturnType<typeof useCreatePostedAnswersMutation>;
export type CreatePostedAnswersMutationResult = Apollo.MutationResult<CreatePostedAnswersMutation>;
export type CreatePostedAnswersMutationOptions = Apollo.BaseMutationOptions<CreatePostedAnswersMutation, CreatePostedAnswersMutationVariables>;