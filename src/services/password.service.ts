import { database as db } from "../firebaseConfig";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

class PasswordService {
  addPassword = (newPassword: object, email: string) => {
    return addDoc(collection(db, email ?? "nothing"), newPassword);
  };

  updatePassword = (id: string, updatedPassword: object, email: string) => {
    const passwordDoc = doc(db, email, id);
    return updateDoc(passwordDoc, updatedPassword);
  };

  deletePassword = (id: string, email: string) => {
    const passwordDoc = doc(db, email, id);
    return deleteDoc(passwordDoc);
  };

  getAllPasswords = (email: string) => {
    return getDocs(collection(db, email ));
  };

  getPassword = (id: string, email: string) => {
    const passwordDoc = doc(db, email, id);
    return getDoc(passwordDoc);
  };
}

export default new PasswordService();
