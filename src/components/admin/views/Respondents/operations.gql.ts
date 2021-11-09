import * as Types from '../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetRespondentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRespondentsQuery = { __typename?: 'Query', getRespondents: { __typename?: 'GetRespondentsPayload', respondents: Array<{ __typename?: 'Respondent', id: string, avgScore: number, uuid: string, createdAt: any, posted_answers: Array<{ __typename?: 'Posted_Answer', uuid: string, question: { __typename?: 'Question', uuid: string, es: string }, answer: { __typename?: 'Answer', es: string, value: any } }> }> } };


export const GetRespondentsDocument = gql`
    query GetRespondents {
  getRespondents {
    respondents {
      id
      avgScore
      uuid
      createdAt
      posted_answers {
        uuid
        question {
          uuid
          es
        }
        answer {
          es
          value
        }
      }
    }
  }
}
    `;

/**
 * __useGetRespondentsQuery__
 *
 * To run a query within a React component, call `useGetRespondentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRespondentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRespondentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRespondentsQuery(baseOptions?: Apollo.QueryHookOptions<GetRespondentsQuery, GetRespondentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRespondentsQuery, GetRespondentsQueryVariables>(GetRespondentsDocument, options);
      }
export function useGetRespondentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRespondentsQuery, GetRespondentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRespondentsQuery, GetRespondentsQueryVariables>(GetRespondentsDocument, options);
        }
export type GetRespondentsQueryHookResult = ReturnType<typeof useGetRespondentsQuery>;
export type GetRespondentsLazyQueryHookResult = ReturnType<typeof useGetRespondentsLazyQuery>;
export type GetRespondentsQueryResult = Apollo.QueryResult<GetRespondentsQuery, GetRespondentsQueryVariables>;