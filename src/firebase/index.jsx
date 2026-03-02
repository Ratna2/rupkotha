import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Cx7u7N7D0uAUd8CrcW3QTKG_0DP1KBA",
  authDomain: "rupkotha-f6a92.firebaseapp.com",
  projectId: "rupkotha-f6a92",
  storageBucket: "rupkotha-f6a92.firebasestorage.app",
  messagingSenderId: "783780480854",
  appId: "1:783780480854:web:2db8e482d41e3c6bac38f7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;