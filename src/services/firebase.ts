// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

// Function to save user data in Firestore
const saveUserToFirestore = async (user: any) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      xp: 0,
      streak: 0,
      achievements: [],
      createdAt: new Date().toISOString(),
    });
  }
};

// Signup Function
export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(userCredential.user);
  return userCredential;
};

// Login Function
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
};

// Logout Function
export const logout = async () => {
  return signOut(auth);
};

// Export Firebase services
export { app, db, auth, storage };