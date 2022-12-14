import { useQuery } from '@apollo/client';

import {
  GET_REPOS_QUERY,
  RepositoriesQueryResult,
  RepositoryData,
} from '@/queries/repos';
import { Loading } from '../Loading';
import { Repository } from '../Repository';
import { RepositoriesGrid } from './styled';

export const Repositories = () => {
  const { loading, error, data } =
    useQuery<RepositoriesQueryResult>(GET_REPOS_QUERY);
  const { viewer } = data || {};
  const repositories: Array<RepositoryData> =
    viewer?.repositories?.edges
      ?.filter((it) => Boolean(it?.node))
      .map((item) => ({ ...(item.node as RepositoryData) })) || [];

  if (loading) return <Loading />;
  if (error || !viewer)
    return <small>{error?.message || 'Data not found at this time'}</small>;
  console.log(repositories);
  return (
    <RepositoriesGrid>
      {repositories.map((repo, index) => {
        return (
          <Repository
            username={viewer?.login || ''}
            repositoryData={repo}
            isInFavorites={index % 2 === 0}
          />
        );
      })}
    </RepositoriesGrid>
  );
};
