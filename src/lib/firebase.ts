import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAsWHtkqdyJonzPlDkCyCN61dEZB7Hz-SQ',
  authDomain: 'hello-build-exercise.firebaseapp.com',
  projectId: 'hello-build-exercise',
  storageBucket: 'hello-build-exercise.appspot.com',
  messagingSenderId: '304238938616',
  appId: '1:304238938616:web:ebb71d9e364736f2f86e0d',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
