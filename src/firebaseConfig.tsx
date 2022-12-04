import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'FILL YOUR DATA',
  authDomain: 'FILL YOUR DATA',
  projectId: 'FILL YOUR DATA',
  storageBucket: 'FILL YOUR DATA',
  messagingSenderId: 'FILL YOUR DATA',
  appId: 'FILL YOUR DATA',
  measurementId: 'FILL YOUR DATA',
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
