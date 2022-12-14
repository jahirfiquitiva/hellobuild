import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const createUserInStore = async (
  userId: string,
  email: string,
  firstName?: string,
  lastName?: string,
) => {
  if (!userId) return;
  // Creates a user document in firestore or updates its
  // information if it already exists
  const existentUserRef = doc(db, 'users', userId);
  const userData: Record<string, string> = { email };
  if (firstName) userData.firstName = firstName;
  if (lastName) userData.lastName = lastName;
  await setDoc(existentUserRef, userData, { merge: true });
};

export const setUserGitHubToken = async (
  userId: string,
  githubToken?: string | null,
) => {
  if (!userId || !githubToken) return;
  // Updates the github token for the signed in user
  const existentUserRef = doc(db, 'users', userId);
  await setDoc(existentUserRef, { githubToken }, { merge: true });
};

export const addToFavorites = (userId: string, repoName?: string) => {
  // Save repo to favorites subcollection
  if (!userId || !repoName) return;
  // TODO
};

export const removeFromFavorites = (userId: string, favoriteId?: string) => {
  // TODO: Remove repo to favorites subcollection
  // collection(db, 'users', user?.uid || 'x', 'favorites')
};
