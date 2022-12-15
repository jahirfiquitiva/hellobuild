import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';

import {
  GET_REPOS_QUERY,
  RepositoriesQueryResult,
  RepositoryData,
} from '@/queries/repos';
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
import { useGitHubQuery } from '@/hooks/useGitHubQuery';

interface RepositoriesProps {
  isFavoritesList?: boolean;
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { isFavoritesList } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favorites, loading: loadingFavorites } = useFavorites();

  const { loading, data } =
    useGitHubQuery<RepositoriesQueryResult>(GET_REPOS_QUERY);
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

  const renderRepositoriesContent = () => {
    if (stillLoading) return null;
    return (
      <>
        {(!repositories || !repositories.length) &&
          isFavoritesList &&
          !loadingFavorites &&
          !searchQuery && (
            <p>
              You haven&apos;t added any favorites yet. Go back to{' '}
              <Link to={'/profile'}>your profile</Link> to do so.
            </p>
          )}
        {!isFavoritesList || favorites.length ? (
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
              disabled={
                isFavoritesList
                  ? !favorites.length
                  : (viewer?.repositories?.totalCount || 0) <= 0
              }
            />
            <RepositoriesSearchIcon />
          </RepositoriesSearchContainer>
        ) : null}
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

  if (!loading && !viewer) return null;
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
      {(viewer?.repositories?.totalCount || 0) > 100 &&
        !stillLoading &&
        !isFavoritesList && (
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
