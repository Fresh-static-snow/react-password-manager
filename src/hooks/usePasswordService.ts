import { database as db } from '../firebaseConfig';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useTypedSelector } from '../hooks/redux';

export const usePasswordService = () => {
  const email = useTypedSelector((state) => state.user.email);

  const add = (newPassword: object) => {
    return addDoc(collection(db, email), newPassword);
  };

  const update = (id: string, updatedPassword: object) => {
    const passwordDoc = doc(db, email, id);
    return updateDoc(passwordDoc, updatedPassword);
  };

  const remove = (id: string) => {
    const passwordDoc = doc(db, email, id);
    return deleteDoc(passwordDoc);
  };

  const get = () => {
    return getDocs(collection(db, email));
  };

  const getOne = (id: string) => {
    const passwordDoc = doc(db, email, id);
    return getDoc(passwordDoc);
  };

  return { add, update, remove, get, getOne };
};
