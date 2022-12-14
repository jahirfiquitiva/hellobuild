import { doc, setDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
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

export const addToFavorites = async (
  userId?: string,
  repoName?: string,
): Promise<string | null> => {
  // Save repo to favorites subcollection
  if (!userId || !repoName) return null;
  const docRef = await addDoc(collection(db, 'users', userId, 'favorites'), {
    repoName,
  });
  return docRef.id;
};

export const removeFromFavorites = async (
  userId?: string,
  favoriteId?: string,
) => {
  // Remove repo to favorites subcollection
  if (!userId || !favoriteId) return null;
  try {
    await deleteDoc(doc(db, 'users', userId, 'favorites', favoriteId));
    return true;
  } catch (e) {
    return false;
  }
};
