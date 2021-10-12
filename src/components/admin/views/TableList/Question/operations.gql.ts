import * as Types from '../../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetQuestionQueryVariables = Types.Exact<{
  input: Types.GetQuestionInput;
}>;


export type GetQuestionQuery = { __typename?: 'Query', getQuestion: { __typename?: 'GetQuestionPayload', question: { __typename?: 'Question', uuid: string, imgUrl?: string | null | undefined, es: string, en: string, answers: Array<{ __typename?: 'Answer', uuid: string, en: string, es: string, value: any }> } } };


export const GetQuestionDocument = gql`
    query getQuestion($input: GetQuestionInput!) {
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