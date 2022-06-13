import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_vpausTgzefr25_-4J05fpX-WNlLmZFA",
  authDomain: "chat-project-1ddf7.firebaseapp.com",
  projectId: "chat-project-1ddf7",
  storageBucket: "chat-project-1ddf7.appspot.com",
  messagingSenderId: "136430031390",
  appId: "1:136430031390:web:d958bf536fd8f3e70dd40f",
  measurementId: "G-QB8NSB45YL",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

