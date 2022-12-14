import { useEffect, useState } from 'react';
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
import {
  RepositoriesGrid,
  RepositoriesSearch,
  RepositoriesSearchContainer,
  RepositoriesSearchIcon,
  RepositoriesSearchLabel,
} from './styled';
import { FC } from '@/types/fc';
import { useFavorites } from '@/hooks/useFavorites';

interface RepositoriesProps {
  isFavoritesList?: boolean;
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { isFavoritesList } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  )
    ?.filter((item) => {
      if (!isFavoritesList) return true;
      return favorites.some((fav) => fav.repoName === item?.nameWithOwner);
    })
    ?.filter((item) => {
      if (!searchQuery) return true;
      return (
        item.nameWithOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.primaryLanguage?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
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
          : `Repositories (${viewer?.repositories?.edges?.length})`}
      </h2>
      <RepositoriesSearchContainer>
        <RepositoriesSearchLabel htmlFor={'search'}>
          Search repository
        </RepositoriesSearchLabel>
        <RepositoriesSearch
          id={'search'}
          name={'Search repository'}
          placeholder={'Search repository'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RepositoriesSearchIcon />
      </RepositoriesSearchContainer>
      <RepositoriesGrid>
        {repositories.map((repo, index) => {
          return (
            <Repository
              key={repo?.nameWithOwner || repo?.name}
              username={viewer?.login || ''}
              repositoryData={repo}
              favoriteId={
                favorites.find((fav) => fav.repoName === repo?.nameWithOwner)
                  ?.id
              }
            />
          );
        })}
      </RepositoriesGrid>
    </>
  );
};
