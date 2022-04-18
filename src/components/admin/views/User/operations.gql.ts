import * as Types from '../../../../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetUserQueryVariables = Types.Exact<{
  input: Types.GetUserInput;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GetUserPayload', user: { __typename?: 'User', uuid: string, createdAt: any, username: string, type: string } } };

export type ChangeUserPasswordMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.ChangeUserPasswordInput>;
}>;


export type ChangeUserPasswordMutation = { __typename?: 'Mutation', changeUserPassword?: { __typename?: 'ChangeUserPasswordPayloadSuccess', user: { __typename?: 'User', uuid: string, username: string, createdAt: any, password: string, type: string } } | { __typename?: 'ChangeUserPasswordPayloadFail', message: string } | null | undefined };


export const GetUserDocument = gql`
    query GetUser($input: GetUserInput!) {
  getUser(input: $input) {
    user {
      uuid
      createdAt
      username
      type
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const ChangeUserPasswordDocument = gql`
    mutation ChangeUserPassword($input: ChangeUserPasswordInput) {
  changeUserPassword(input: $input) {
    ... on ChangeUserPasswordPayloadSuccess {
      user {
        uuid
        username
        createdAt
        password
        type
      }
    }
    ... on ChangeUserPasswordPayloadFail {
      message
    }
  }
}
    `;
export type ChangeUserPasswordMutationFn = Apollo.MutationFunction<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;

/**
 * __useChangeUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserPasswordMutation, { data, loading, error }] = useChangeUserPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>(ChangeUserPasswordDocument, options);
      }
export type ChangeUserPasswordMutationHookResult = ReturnType<typeof useChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationResult = Apollo.MutationResult<ChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;