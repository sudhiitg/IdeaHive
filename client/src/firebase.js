// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d13d1.firebaseapp.com",
  projectId: "mern-blog-d13d1",
  storageBucket: "mern-blog-d13d1.firebasestorage.app",
  messagingSenderId: "742960483484",
  appId: "1:742960483484:web:107758fa48fa3b4e5c3159"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);