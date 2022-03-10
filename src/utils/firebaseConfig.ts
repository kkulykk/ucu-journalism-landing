// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7DrbWVJr4cdgL-x1jJ-XjJRKXj7L0bX4",
  authDomain: "ucu-journalism-landing.firebaseapp.com",
  projectId: "ucu-journalism-landing",
  storageBucket: "ucu-journalism-landing.appspot.com",
  messagingSenderId: "779410103653",
  appId: "1:779410103653:web:77a4825ed660956858158c"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);

export { firestore, auth, storage }