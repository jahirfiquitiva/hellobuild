import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import {
  GET_REPOS_QUERY,
  RepositoriesQueryResult,
  RepositoryData,
} from '@/queries/repos';
import { useAuth } from '@/providers';
import { useGitHubAuth } from '@/hooks/useGitHubAuth';

import { Loading } from '../Loading';
import { Repository } from '../Repository';
import { RepositoriesGrid } from './styled';
import { FC } from '@/types/fc';
import { useFavorites } from '@/hooks/useFavorites';

interface RepositoriesProps {
  isFavoritesList?: boolean;
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { isFavoritesList } = props;
  const { user } = useAuth();
  const { token: githubToken } = useGitHubAuth(user?.githubToken);

  const favorites = useFavorites();

  const { loading, data, refetch } =
    useQuery<RepositoriesQueryResult>(GET_REPOS_QUERY);
  const { viewer } = data || {};
  const repositories: Array<RepositoryData> = (
    viewer?.repositories?.edges?.map((item) => ({
      ...(item.node as RepositoryData),
    })) || []
  )?.filter((item) => {
    if (!isFavoritesList) return true;
    return favorites.some((fav) => fav.repoName === item?.nameWithOwner);
  });

  useEffect(() => {
    refetch?.();
  }, [githubToken, refetch]);

  if (loading && isFavoritesList) return <Loading />;
  if (!repositories || !repositories.length) return null;
  return (
    <>
      <h2>
        {isFavoritesList
          ? `Favorites (${favorites.length})`
          : `Repositories (${repositories.length})`}
      </h2>
      <RepositoriesGrid>
        {repositories.map((repo, index) => {
          return (
            <Repository
              key={repo?.nameWithOwner || repo?.name}
              username={viewer?.login || ''}
              repositoryData={repo}
              isInFavorites={favorites.some(
                (fav) => fav.repoName === repo?.nameWithOwner,
              )}
            />
          );
        })}
      </RepositoriesGrid>
    </>
  );
};
