import * as Types from '../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetQuestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetQuestionsQuery = { __typename?: 'Query', getFullQuestions: { __typename?: 'GetFullQuestionsPayload', questions: Array<{ __typename?: 'Full_Question', id: number, uuid: string, imgUrl?: string | null | undefined, question: { __typename?: 'Question', id: number, es: string, en: string }, answers: Array<{ __typename?: 'Answer', id: number, value: any, es: string, en: string }> }> } };


export const GetQuestionsDocument = gql`
    query GetQuestions {
  getFullQuestions {
    questions {
      id
      uuid
      imgUrl
      question {
        id
        es
        en
      }
      answers {
        id
        value
        es
        en
      }
    }
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