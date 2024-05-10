// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const ENVapiKey = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: ENVapiKey,
  authDomain: "catan-4dea2.firebaseapp.com",
  projectId: "catan-4dea2",
  storageBucket: "catan-4dea2.appspot.com",
  messagingSenderId: "543101861666",
  appId: "1:543101861666:web:a5e7ccf372462e602aaf7b",
  measurementId: "G-63XVQ1JJR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
