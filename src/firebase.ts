import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
console.log("Firebase loaded");


// ------------------------
// FIRST APP: Achievements DB (existing Firestore app)
// ------------------------
const firebaseConfigAchievements = {
  apiKey: "AIzaSyBbTnSfA64iW3pxe7WkTqHU9EvYreWra-I",
  authDomain: "achievements-database-73f43.firebaseapp.com",
  projectId: "achievements-database-73f43",
  storageBucket: "achievements-database-73f43.firebasestorage.app",
  messagingSenderId: "476933805430",
  appId: "1:476933805430:web:5f5188e25316628d7c5657",
  measurementId: "G-171MVYJ423"
};

// Initialize FIRST app
const achievementsApp = initializeApp(firebaseConfigAchievements, "achievementsApp");
export const achievementsDB = getFirestore(achievementsApp);


// ------------------------
// SECOND APP: FitHub Users (Realtime Database)
// ------------------------
const fithubConfig = {
  apiKey: "AIzaSyDt36zNSaIrXJDYEBA5bsWDjWimCZAn_kI",
  authDomain: "fithub-users.firebaseapp.com",
  databaseURL: "https://fithub-users-default-rtdb.firebaseio.com",
  projectId: "fithub-users",
  storageBucket: "fithub-users.firebasestorage.app",
  messagingSenderId: "827829268282",
  appId: "1:827829268282:web:f485c13b24609ddff72a03",
  measurementId: "G-LP9CWKTFDS"
};

// Initialize SECOND app with a NAME to avoid conflict
const fithubApp = initializeApp(fithubConfig, "fithubApp");

// Export database instance
export const fithubDB = getDatabase(fithubApp);
