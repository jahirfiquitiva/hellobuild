import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {
  GET_REPOS_QUERY,
  RepositoriesQueryResult,
  RepositoryData,
} from '@/queries/repos';
import { useGitHub } from '@/providers';
import { useFavorites } from '@/hooks/useFavorites';

import { Loading } from '../Loading';
import { Repository } from '../Repository';
import {
  RepositoriesGrid,
  RepositoriesSearch,
  RepositoriesSearchContainer,
  RepositoriesSearchIcon,
  RepositoriesSearchLabel,
} from './styled';

interface RepositoriesProps {
  isFavoritesList?: boolean;
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { isFavoritesList } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { token: githubToken, loading: loadingGitHubToken } = useGitHub();

  const { favorites, loading: loadingFavorites } = useFavorites();

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
    if (githubToken) refetch?.();
  }, [githubToken, refetch]);

  const renderRepositoriesContent = () => {
    if (stillLoading) return null;
    if (!repositories || !repositories.length) {
      if (isFavoritesList && !loadingFavorites) {
        return (
          <p>
            You haven&apos;t added any favorites yet. Go back to{' '}
            <Link to={'/profile'}>your profile</Link> to do so.
          </p>
        );
      }
      return null;
    }
    return (
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

  if (loadingGitHubToken) return null;
  if (!loadingGitHubToken && !githubToken) return null;
  return (
    <section id={isFavoritesList ? 'favorites' : 'repositories'}>
      <h2>
        {isFavoritesList
          ? `Favorites ${
              loadingFavorites ? '' : `(${favorites.length})`
            }`.trim()
          : `Repositories ${
              stillLoading ? '' : `(${viewer?.repositories?.totalCount || 0})`
            }`.trim()}
      </h2>
      {(stillLoading || (isFavoritesList && loadingFavorites)) && (
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
      {renderRepositoriesContent()}
    </section>
  );
};
