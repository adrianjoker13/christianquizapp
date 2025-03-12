// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, logEvent } from "firebase/analytics";
import messaging from "@react-native-firebase/messaging";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { where } from "firebase/firestore";

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
const analytics = getAnalytics(app);

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

// Function to log quiz completion event
export const logQuizCompletion = (quizId: string, score: number) => {
  logEvent(analytics, "quiz_completed", {
    quiz_id: quizId,
    score: score,
    timestamp: new Date().toISOString(),
  });
};

// Function to log XP earned event
export const logXPEarned = (xpAmount: number) => {
  logEvent(analytics, "xp_earned", {
    xp_amount: xpAmount,
    timestamp: new Date().toISOString(),
  });
};

// Function to request and store FCM token
export const updateFCMToken = async (userId: string) => {
  try {
    const token = await messaging().getToken();
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { fcmToken: token });
    console.log("FCM token updated:", token);
  } catch (error) {
    console.error("Error updating FCM token:", error);
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
  let badges: string[] = [];
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

    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastLogin === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

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

// Function to fetch leaderboard data with filtering
export const fetchLeaderboard = async (filter: "daily" | "weekly" | "all-time") => {
  try {
    let leaderboardQuery;
    
    if (filter === "daily") {
      const today = new Date().toISOString().split("T")[0];
      leaderboardQuery = query(
        collection(db, "users"),
        where("lastLogin", "==", today),
        orderBy("xp", "desc"),
        limit(10)
      );
    } else if (filter === "weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      leaderboardQuery = query(
        collection(db, "users"),
        where("lastLogin", ">=", oneWeekAgo.toISOString().split("T")[0]),
        orderBy("xp", "desc"),
        limit(10)
      );
    } else {
      leaderboardQuery = query(collection(db, "users"), orderBy("xp", "desc"), limit(10));
    }

    const snapshot = await getDocs(leaderboardQuery);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as { email?: string; xp?: number };
      return {
        id: doc.id,
        email: data.email || "Unknown",
        xp: data.xp || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};



// Export Firebase services
export { db, auth };