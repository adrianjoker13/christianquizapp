// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, orderBy, query, limit } from "firebase/firestore";
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

// Function to determine badges based on XP
const getBadgesForXP = (xp: number): string[] => {
  let badges = [];
  if (xp >= 100) badges.push("Bronze Achiever 🥉");
  if (xp >= 250) badges.push("Silver Champion 🥈");
  if (xp >= 500) badges.push("Gold Master 🥇");
  if (xp >= 1000) badges.push("Legendary Warrior 🔥");
  return badges;
};

// Function to update XP, streak, and badges
export const updateXPStreakAndBadges = async (xpEarned: number) => {
  if (!auth.currentUser) return;

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const today = new Date().toISOString().split("T")[0];
    const lastLogin = userData.lastLogin || today;
    let newStreak = userData.streak || 0;

    // Check if user logged in consecutively
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastLogin === yesterdayStr) {
        newStreak += 1; // Increase streak
      } else {
        newStreak = 1; // Reset streak
      }
    }

    // Calculate new XP and badges
    const newXP = (userData.xp || 0) + xpEarned;
    const newBadges = getBadgesForXP(newXP);

    await updateDoc(userRef, {
      xp: newXP,
      streak: newStreak,
      lastLogin: today,
      achievements: newBadges,
    });
  }
};

// Function to fetch leaderboard data from Firestore leaderboard collection
export const fetchLeaderboard = async (): Promise<{ id: string; email: string; xp: number }[]> => {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, orderBy("xp", "desc"), limit(10));
  const snapshot = await getDocs(q);

  let leaderboard: { id: string; email: string; xp: number }[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    leaderboard.push({ id: doc.id, email: data.email, xp: data.xp });
  });

  return leaderboard;
};

// Export Firebase services
export { app, db, auth, storage };
