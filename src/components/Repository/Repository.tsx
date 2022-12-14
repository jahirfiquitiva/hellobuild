import type { RepositoryData } from '@/queries/repos';
import { GitFork, Heart, Star } from 'lucide-react';
import { FC } from 'react';
import {
  RepositoryCard,
  RepositoryLink,
  RepositoryHeader,
  RepositoryTitle,
  RepositoryVisibility,
  RepositoryDescription,
  RepositoryStat,
  RepositoryLanguageIcon,
  FavoriteButton,
} from './styled';

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
  isInFavorites?: boolean;
  onFavoriteClicked?: (addToFavorites?: boolean) => void;
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
  const { username, repositoryData, isInFavorites } = props;

  const label = getRepositoryLabel(repositoryData);
  const favButtonTitle = isInFavorites
    ? 'Remove repository from favorites'
    : 'Add repository to favorites';
  const heartIconProps = isInFavorites
    ? { fill: 'var(--nc-tx-2)', color: 'var(--nc-tx-2)' }
    : { color: 'var(--nc-tx-2)' };
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
      <RepositoryHeader>
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
        {Boolean(label) && <RepositoryVisibility>{label}</RepositoryVisibility>}
        <FavoriteButton title={favButtonTitle} aria-label={favButtonTitle}>
          <Heart {...heartIconProps} />
        </FavoriteButton>
      </RepositoryHeader>
      <RepositoryDescription>
        {repositoryData?.description}
      </RepositoryDescription>
      <RepositoryHeader css={{ marginTop: 'auto', gap: '1rem' }}>
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
