import { useAuth } from '@/providers';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '@/lib/firebase';

export interface Favorite {
  id: string;
  repoName: string;
}

export const useFavorites = (userId?: string): Array<Favorite> => {
  const { user } = useAuth();
  const [collectionSnapshot] = useCollection(
    collection(db, 'users', user?.uid || 'x', 'favorites'),
  );
  return (
    collectionSnapshot?.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Favorite;
    }) || []
  );
};
