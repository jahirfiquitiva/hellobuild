import { Heart } from 'lucide-react';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { toastConfig } from '@/utils/toast';
import { useAuth } from '@/providers';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/utils/firestore-operations';

import { FavoriteButton } from './styled';

interface FavoriteToggleProps {
  repoName: string;
  favoriteId?: string;
}

export const FavoriteToggle: FC<FavoriteToggleProps> = (props) => {
  const { repoName, favoriteId } = props;
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const favButtonTitle = favoriteId
    ? 'Remove repository from favorites'
    : 'Add repository to favorites';

  const heartIconProps = favoriteId
    ? { fill: 'var(--nc-tx-2)', color: 'var(--nc-tx-2)' }
    : { color: 'var(--nc-tx-2)' };

  const onButtonClicked = () => {
    if (submitting) return;
    setSubmitting(true);
    if (favoriteId) {
      removeFromFavorites(user?.uid, favoriteId)
        .then((deleted) => {
          if (deleted)
            toast(`Repository "${repoName}" removed from favorites`, {
              ...toastConfig,
              icon: '🗑️',
            });
          setSubmitting(false);
        })
        .catch((error) => {
          toast.error(
            error.message || 'Unexpected error. Try again in a minute',
            toastConfig,
          );
          setSubmitting(false);
        });
    } else {
      addToFavorites(user?.uid, repoName)
        .then((newFavoriteId) => {
          if (newFavoriteId) {
            toast(`Repository "${repoName}" added to favorites`, {
              ...toastConfig,
              icon: '💚',
            });
          } else {
            toast.error('Unexpected error. Try again in a minute', toastConfig);
          }
          setSubmitting(false);
        })
        .catch((error) => {
          toast.error(
            error.message || 'Unexpected error. Try again in a minute',
            toastConfig,
          );
          setSubmitting(false);
        });
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
      disabled={submitting}
    >
      <Heart {...heartIconProps} />
    </FavoriteButton>
  );
};
