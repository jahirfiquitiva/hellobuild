import type { RepositoryData } from '@/queries/repos';
import { FC } from 'react';

interface RepositoryProps {
  username: string;
  repositoryData?: RepositoryData;
}

export const Repository: FC<RepositoryProps> = (props) => {
  const { username, repositoryData } = props;
  if (!repositoryData) return null;
  return (
    <a href={`https://github.com/${repositoryData?.nameWithOwner}`}>
      <p>
        {repositoryData?.nameWithOwner.startsWith(username)
          ? repositoryData?.name
          : repositoryData?.nameWithOwner}
      </p>
    </a>
  );
};
