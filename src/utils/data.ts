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

export const setUserGitHubToken = () => {
  // TODO: Save GitHub token in user document
};

export const addToFavorites = () => {
  // TODO: Save repo to favorites subcollection
};

export const removeFromFavorites = () => {
  // TODO: Remove repo to favorites subcollection
};
