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
  const [userSnapshot, loading] = useDocument(doc(db, 'users', userId || 'x'));
  const userData: UserData | undefined = userSnapshot?.data() as UserData;
  if (userData?.firstName && !loading)
    return { ...userData, uid: userId } as UserData;
  return undefined;
};
