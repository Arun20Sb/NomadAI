// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jetsetgo-07.firebaseapp.com",
  projectId: "jetsetgo-07",
  storageBucket: "jetsetgo-07.firebasestorage.app",
  messagingSenderId: "234443631659",
  appId: "1:234443631659:web:2271a5f68e44d123bf4e6e",
  measurementId: "G-X7VZ1B98GQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
