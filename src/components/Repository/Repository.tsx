import { GitFork, Star } from 'lucide-react';
import { FC } from 'react';

import type { RepositoryData } from '@/queries/repos';
import {
  RepositoryCard,
  RepositoryLink,
  RepositoryHeader,
  RepositoryTitle,
  RepositoryVisibility,
  RepositoryDescription,
  RepositoryStat,
  RepositoryLanguageIcon,
} from './styled';
import { FavoriteToggle } from './FavoriteToggle';

type RepositoryLabel =
  | 'Archived'
  | 'Disabled'
  | 'Empty'
  | 'Private'
  | 'Template'
  | 'Public';

interface RepositoryProps {
  username: string;
  repositoryData?: RepositoryData;
  favoriteId?: string;
}

const getRepositoryLabel = (
  repositoryData?: RepositoryData,
): RepositoryLabel | null => {
  if (!repositoryData) return null;
  if (repositoryData?.isArchived) return 'Archived';
  if (repositoryData?.isDisabled) return 'Disabled';
  if (repositoryData?.isEmpty) return 'Empty';
  if (repositoryData?.isTemplate) return 'Template';
  if (repositoryData?.isPrivate || repositoryData?.visibility === 'PRIVATE')
    return 'Private';
  if (repositoryData?.visibility === 'PUBLIC') return null;
  return repositoryData?.visibility;
};

export const Repository: FC<RepositoryProps> = (props) => {
  const { username, repositoryData, favoriteId } = props;

  const label = getRepositoryLabel(repositoryData);
  if (!repositoryData) return null;
  return (
    <RepositoryCard
      css={
        repositoryData?.primaryLanguage?.color
          ? {
              '&:hover': {
                borderColor:
                  repositoryData?.primaryLanguage?.color || 'var(--nc-bg-3)',
              },
            }
          : undefined
      }
    >
      <RepositoryHeader css={{ justifyContent: 'space-between' }}>
        <RepositoryLink
          href={`https://github.com/${repositoryData?.nameWithOwner}`}
          rel={'noopener noreferrer'}
          target={'_blank'}
        >
          <RepositoryTitle>
            {repositoryData?.nameWithOwner.startsWith(username)
              ? repositoryData?.name
              : repositoryData?.nameWithOwner}
          </RepositoryTitle>
        </RepositoryLink>
        <RepositoryHeader>
          {Boolean(label) && (
            <RepositoryVisibility>{label}</RepositoryVisibility>
          )}
          <FavoriteToggle
            repoName={repositoryData?.nameWithOwner}
            favoriteId={favoriteId}
          />
        </RepositoryHeader>
      </RepositoryHeader>
      <RepositoryDescription>
        {repositoryData?.description}
      </RepositoryDescription>
      <RepositoryHeader
        css={{
          marginTop: 'auto',
          gap: '1rem',
          paddingTop: '.5rem',
          paddingBottom: '.25rem',
        }}
      >
        {Boolean(repositoryData?.primaryLanguage) && (
          <RepositoryStat>
            <RepositoryLanguageIcon
              css={{ backgroundColor: repositoryData?.primaryLanguage?.color }}
            />
            <span>{repositoryData?.primaryLanguage?.name}</span>
          </RepositoryStat>
        )}
        {Boolean(repositoryData?.stargazerCount) && (
          <RepositoryStat>
            <Star size={13} />
            <span>{repositoryData?.stargazerCount}</span>
          </RepositoryStat>
        )}
        {Boolean(repositoryData?.forkCount) && (
          <RepositoryStat>
            <GitFork size={13} />
            <span>{repositoryData?.forkCount}</span>
          </RepositoryStat>
        )}
      </RepositoryHeader>
    </RepositoryCard>
  );
};
