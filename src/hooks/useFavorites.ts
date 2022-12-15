import { useAuth } from '@/providers';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/lib/firebase';

export interface Favorite {
  id: string;
  repoName: string;
}

interface FavoritesHookResult {
  favorites: Array<Favorite>;
  loading: boolean;
}

export const useFavorites = (): FavoritesHookResult => {
  const { user } = useAuth();
  const [collectionSnapshot, loading] = useCollection(
    collection(db, 'users', user?.uid || 'x', 'favorites'),
  );
  return {
    loading,
    favorites:
      collectionSnapshot?.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Favorite;
      }) || [],
  };
};
