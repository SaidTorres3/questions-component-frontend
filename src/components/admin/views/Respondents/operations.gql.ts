import * as Types from '../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetRespondentsQueryVariables = Types.Exact<{
  skip?: Types.Maybe<Types.Scalars['Int']>;
  take?: Types.Maybe<Types.Scalars['Int']>;
  sort?: Types.Maybe<Types.GetRespondentsSortInput>;
}>;


export type GetRespondentsQuery = { __typename?: 'Query', getRespondents: { __typename?: 'GetRespondentsPayload', total: number, take: number, skip: number, hasMore: boolean, items: Array<{ __typename?: 'Respondent', uuid: string, id: string, createdAt: any, avgScore: number }> } };


export const GetRespondentsDocument = gql`
    query GetRespondents($skip: Int, $take: Int, $sort: GetRespondentsSortInput) {
  getRespondents(skip: $skip, take: $take, sort: $sort) {
    items {
      uuid
      id
      createdAt
      avgScore
    }
    total
    take
    skip
    hasMore
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
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      sort: // value for 'sort'
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