// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu3KaUlE9rFV70QiV_3X6C1ub1ivT_XjY",
  authDomain: "loads1.firebaseapp.com",
  projectId: "loads1",
  storageBucket: "loads1.firebasestorage.app",
  messagingSenderId: "664071024678",
  appId: "1:664071024678:web:49bb8d783f7e68f413b6e7",
  measurementId: "G-2RLMJJWQQ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
