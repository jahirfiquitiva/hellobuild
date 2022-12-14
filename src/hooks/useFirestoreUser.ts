import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '@/lib/firebase';

export interface UserData {
  uid: string;
  firstName?: string;
  lastName?: string;
  email: string;
  githubToken?: string;
}

export const useFirestoreUser = (userId?: string): UserData | undefined => {
  const [userSnapshot] = useDocument(doc(db, 'users', userId || 'x'));

  return userSnapshot
    ? ({ ...userSnapshot.data(), uid: userId } as UserData)
    : undefined;
};
