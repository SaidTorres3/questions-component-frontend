import * as Types from '../../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetRespondentQueryVariables = Types.Exact<{
  input: Types.GetRespondentInput;
}>;


export type GetRespondentQuery = { __typename?: 'Query', getRespondent: { __typename?: 'GetRespondentPayload', respondent: { __typename?: 'Respondent', id: string, posted_answers: Array<{ __typename?: 'Posted_Answer', question: { __typename?: 'Question', es: string }, answer: { __typename?: 'Answer', uuid: string, es: string } }> } } };


export const GetRespondentDocument = gql`
    query GetRespondent($input: GetRespondentInput!) {
  getRespondent(input: $input) {
    respondent {
      id
      posted_answers {
        question {
          es
        }
        answer {
          uuid
          es
        }
      }
    }
  }
}
    `;

/**
 * __useGetRespondentQuery__
 *
 * To run a query within a React component, call `useGetRespondentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRespondentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRespondentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRespondentQuery(baseOptions: Apollo.QueryHookOptions<GetRespondentQuery, GetRespondentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRespondentQuery, GetRespondentQueryVariables>(GetRespondentDocument, options);
      }
export function useGetRespondentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRespondentQuery, GetRespondentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRespondentQuery, GetRespondentQueryVariables>(GetRespondentDocument, options);
        }
export type GetRespondentQueryHookResult = ReturnType<typeof useGetRespondentQuery>;
export type GetRespondentLazyQueryHookResult = ReturnType<typeof useGetRespondentLazyQuery>;
export type GetRespondentQueryResult = Apollo.QueryResult<GetRespondentQuery, GetRespondentQueryVariables>;