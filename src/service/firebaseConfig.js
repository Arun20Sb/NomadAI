// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nomadaimrbob-f72f6.firebaseapp.com",
  projectId: "nomadaimrbob-f72f6",
  storageBucket: "nomadaimrbob-f72f6.firebasestorage.app",
  messagingSenderId: "362597993849",
  appId: "1:362597993849:web:5dc81e19708aa3e05373a8",
  measurementId: "G-NZV54P0PJJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const f_database = getFirestore(app);

export { f_database };
