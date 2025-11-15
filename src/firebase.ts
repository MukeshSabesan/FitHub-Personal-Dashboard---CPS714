// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbTnSfA64iW3pxe7WkTqHU9EvYreWra-I",
  authDomain: "achievements-database-73f43.firebaseapp.com",
  projectId: "achievements-database-73f43",
  storageBucket: "achievements-database-73f43.firebasestorage.app",
  messagingSenderId: "476933805430",
  appId: "1:476933805430:web:5f5188e25316628d7c5657",
  measurementId: "G-171MVYJ423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);