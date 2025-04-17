// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, orderBy, query, limit, increment, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, logEvent } from "firebase/analytics";
import messaging from "@react-native-firebase/messaging";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

// 🎖️ Achievement Configurations: Easily edit milestone values & names here
const ACHIEVEMENTS = {
  XP: [
    { threshold: 100, name: "Bronze Achiever", icon: "🥉" },
    { threshold: 250, name: "Silver Champion", icon: "🥈" },
    { threshold: 500, name: "Gold Master", icon: "🥇" },
    { threshold: 1000, name: "Legendary Warrior", icon: "🔥" },
  ],
  STREAK: [
    { threshold: 3, name: "Streak Starter", icon: "⚡" },
    { threshold: 7, name: "Streak Keeper", icon: "🔥" },
    { threshold: 14, name: "Unstoppable Streak", icon: "🚀" },
    { threshold: 30, name: "Streak Legend", icon: "🏆" },
  ],
  QUIZZES: [
    { threshold: 5, name: "Quiz Novice", icon: "📘" },
    { threshold: 10, name: "Quiz Master", icon: "📚" },
    { threshold: 25, name: "Ultimate Quiz Champion", icon: "🎓" },
  ],
};

// Function to check and unlock achievements
export const checkAndUnlockAchievements = async (userId: string, xp: number, streak: number, quizzesCompleted: number) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return;

    const userData = userSnap.data() as { achievements: string[] };
    const unlockedAchievements = userData.achievements || [];
    let newAchievements: string[] = [];

    // 🏆 Check XP Achievements
    ACHIEVEMENTS.XP.forEach(({ threshold, name, icon }) => {
      if (xp >= threshold && !unlockedAchievements.includes(name)) {
        newAchievements.push(`${name} ${icon}`);
      }
    });

    // 🔥 Check Streak Achievements
    ACHIEVEMENTS.STREAK.forEach(({ threshold, name, icon }) => {
      if (streak >= threshold && !unlockedAchievements.includes(name)) {
        newAchievements.push(`${name} ${icon}`);
      }
    });

    // 📚 Check Quiz Completion Achievements
    ACHIEVEMENTS.QUIZZES.forEach(({ threshold, name, icon }) => {
      if (quizzesCompleted >= threshold && !unlockedAchievements.includes(name)) {
        newAchievements.push(`${name} ${icon}`);
      }
    });

    if (newAchievements.length > 0) {
      await updateDoc(userRef, {
        achievements: [...unlockedAchievements, ...newAchievements],
      });
      newAchievements.forEach(async (achievement) => {
        await createSocialPost(userId, "achievement", `Unlocked: ${achievement}! 🎉`);
      });
    }
  } catch (error) {
    console.error("Error unlocking achievements:", error);
  }
};

// Function to update XP, streak, and check for new achievements
export const updateXPStreakAndBadges = async (xpEarned: number, quizzesCompleted: number) => {
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

      newStreak = lastLogin === yesterdayStr ? newStreak + 1 : 1;
    }

    const newXP = (userData.xp || 0) + xpEarned;

    await updateDoc(userRef, {
      xp: newXP,
      streak: newStreak,
      lastLogin: today,
    });

    await checkAndUnlockAchievements(auth.currentUser.uid, newXP, newStreak, quizzesCompleted);
    await createSocialPost(auth.currentUser.uid, "xp", `Earned ${xpEarned} XP! 🎉`);
  }
};

// Export Firebase services
export { db, auth };
