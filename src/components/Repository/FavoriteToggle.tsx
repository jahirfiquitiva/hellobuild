import { useAuth } from '@/providers';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/utils/firestore-operations';
import { Heart } from 'lucide-react';
import { FC } from 'react';
import { FavoriteButton } from './styled';

interface FavoriteToggleProps {
  repoName: string;
  favoriteId?: string;
}

export const FavoriteToggle: FC<FavoriteToggleProps> = (props) => {
  const { repoName, favoriteId } = props;
  const { user } = useAuth();

  const favButtonTitle = favoriteId
    ? 'Remove repository from favorites'
    : 'Add repository to favorites';

  const heartIconProps = favoriteId
    ? { fill: 'var(--nc-tx-2)', color: 'var(--nc-tx-2)' }
    : { color: 'var(--nc-tx-2)' };

  const onButtonClicked = async () => {
    if (favoriteId) {
      removeFromFavorites(user?.uid, favoriteId)
        .then((deleted) => {})
        .catch((error) => {});
    } else {
      addToFavorites(user?.uid, repoName)
        .then((favoriteId) => {})
        .catch((error) => {});
    }
  };

  if (!repoName) return null;

  return (
    <FavoriteButton
      title={favButtonTitle}
      aria-label={favButtonTitle}
      onClick={() => {
        onButtonClicked();
      }}
    >
      <Heart {...heartIconProps} />
    </FavoriteButton>
  );
};
