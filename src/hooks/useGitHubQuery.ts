import { useEffect } from 'react';
import {
  type QueryResult,
  type DocumentNode,
  type TypedDocumentNode,
  type OperationVariables,
  type QueryHookOptions,
  useQuery,
} from '@apollo/client';

import { useGitHub } from '@/providers';

type GitHubQueryReturnType<T, V = OperationVariables> = QueryResult<T, V> & {
  token?: string | null;
};

// useQuery wrapper hook to do GitHub authenticated queries, and refetch data
// if the github token changes
export const useGitHubQuery = <T, V = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<T, V>,
  options?: QueryHookOptions<T, V>,
): GitHubQueryReturnType<T, V> => {
  const { token: githubToken, loading: loadingGitHubToken } = useGitHub();
  const queryResult = useQuery<T, V>(query, options);

  useEffect(() => {
    if (loadingGitHubToken) return;
    if (githubToken) queryResult?.refetch();
  }, [loadingGitHubToken, githubToken, queryResult]);

  return { ...queryResult, token: githubToken };
};
