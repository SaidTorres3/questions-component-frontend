import * as Types from '../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetQuestionsQueryVariables = Types.Exact<{
  skip?: Types.Maybe<Types.Scalars['Int']>;
  take?: Types.Maybe<Types.Scalars['Int']>;
  sort?: Types.Maybe<Types.GetQuestionsSortInput>;
}>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestions: { __typename?: 'GetQuestionsPayload', total: number, skip: number, take: number, hasMore: boolean, items: Array<{ __typename?: 'Question', uuid: string, imgUrl?: string | null | undefined, en: string, es: string, answers: Array<{ __typename?: 'Answer', en: string, es: string, uuid: string, value: any }> }> } };


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