// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVEEahctBCvnXJZuODUxyR3ej7WpUOmQ0",
  authDomain: "christian-quiz-app.firebaseapp.com",
  projectId: "christian-quiz-app",
  storageBucket: "christian-quiz-app.firebasestorage.app",
  messagingSenderId: "1032902648953",
  appId: "1:1032902648953:web:7c42d2f91531b52d64a0a8",
  measurementId: "G-H4SDZRNQ45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export Firebase services
export { app, db, auth, storage };