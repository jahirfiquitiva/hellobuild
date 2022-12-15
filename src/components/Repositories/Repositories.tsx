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
import { Link } from 'react-router-dom';

interface RepositoriesProps {
  isFavoritesList?: boolean;
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { isFavoritesList } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { user, loading: authLoading } = useAuth();
  const { token: githubToken, loading: loadingGitHubToken } = useGitHubAuth(
    user?.githubToken,
  );

  const favorites = useFavorites();

  const { loading, data, refetch } =
    useQuery<RepositoriesQueryResult>(GET_REPOS_QUERY);
  const { viewer } = data || {};
  const stillLoading: boolean = loading && !viewer;

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

  if (authLoading || loadingGitHubToken) return null;
  if ((!repositories || !repositories.length) && !stillLoading) {
    if (isFavoritesList) {
      return (
        <>
          <h2>Favorites</h2>
          <p>
            You haven&apos;t added any favorites yet. Go back to{' '}
            <Link to={'/profile'}>your profile</Link> to do so.
          </p>
        </>
      );
    }
    return null;
  }
  return (
    <>
      <h2>
        {isFavoritesList
          ? `Favorites ${stillLoading ? '' : `(${favorites.length})`}`.trim()
          : `Repositories ${
              stillLoading ? '' : `(${viewer?.repositories?.totalCount || 0})`
            }`.trim()}
      </h2>
      {stillLoading && (
        <Loading
          useLine
          text={`Loading ${
            isFavoritesList ? 'favorites' : 'repositories'
          } list…`}
        />
      )}
      {(viewer?.repositories?.totalCount || 0) > 100 && !isFavoritesList && (
        <small>
          <strong>Disclaimer:</strong>
          <br />
          Only your 100 most recently updated repositories are shown.
          <br />
          Although you have contributed to a total of{' '}
          <a
            href={`https://github.com/${viewer?.login}?tab=repositories`}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            {viewer?.repositories?.totalCount || 0} repositories
          </a>
          . Impressive! 🎉
        </small>
      )}
      {!stillLoading && (
        <>
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
            {repositories.map((repo) => {
              return (
                <Repository
                  key={repo?.nameWithOwner || repo?.name}
                  username={viewer?.login || ''}
                  repositoryData={repo}
                  favoriteId={
                    favorites.find(
                      (fav) => fav.repoName === repo?.nameWithOwner,
                    )?.id
                  }
                />
              );
            })}
          </RepositoriesGrid>
        </>
      )}
    </>
  );
};
