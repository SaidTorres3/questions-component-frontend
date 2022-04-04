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

export type DeleteRespondentMutationVariables = Types.Exact<{
  input: Types.DeleteRespondentInput;
}>;


export type DeleteRespondentMutation = { __typename?: 'Mutation', deleteRespondent: { __typename?: 'DeleteRespondentPayload', deletedUuid: string } };


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
export const DeleteRespondentDocument = gql`
    mutation DeleteRespondent($input: DeleteRespondentInput!) {
  deleteRespondent(input: $input) {
    deletedUuid
  }
}
    `;
export type DeleteRespondentMutationFn = Apollo.MutationFunction<DeleteRespondentMutation, DeleteRespondentMutationVariables>;

/**
 * __useDeleteRespondentMutation__
 *
 * To run a mutation, you first call `useDeleteRespondentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRespondentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRespondentMutation, { data, loading, error }] = useDeleteRespondentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRespondentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRespondentMutation, DeleteRespondentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRespondentMutation, DeleteRespondentMutationVariables>(DeleteRespondentDocument, options);
      }
export type DeleteRespondentMutationHookResult = ReturnType<typeof useDeleteRespondentMutation>;
export type DeleteRespondentMutationResult = Apollo.MutationResult<DeleteRespondentMutation>;
export type DeleteRespondentMutationOptions = Apollo.BaseMutationOptions<DeleteRespondentMutation, DeleteRespondentMutationVariables>;