// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs, orderBy, query, limit, increment, } from "firebase/firestore";
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
export const updateXPStreakAndBadges = async (xpEarned: number, quizzesCompleted: number) => {
  if (!auth.currentUser) return;

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const today = new Date().toISOString().split("T")[0];
    const lastLogin = userData.lastLogin || today;
    let newStreak = userData.streak || 0;

    // 🔥 Update streak logic
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

    // 🏆 Update XP
    const newXP = (userData.xp || 0) + xpEarned;

    // 🔍 Check for new achievements
    await checkAndUnlockAchievements(auth.currentUser.uid, newXP, newStreak, quizzesCompleted);
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

    // 🔥 Update streak logic
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

    // 🏆 Update XP
    const newXP = (userData.xp || 0) + xpEarned;

    // 🔍 Check for new achievements
    await checkAndUnlockAchievements(auth.currentUser.uid, newXP, newStreak, quizzesCompleted);
  }

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

    // 🔥 Update streak logic
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

    // 🏆 Update XP
    const newXP = (userData.xp || 0) + xpEarned;

    // 🔍 Check for new achievements
    await checkAndUnlockAchievements(auth.currentUser.uid, newXP, newStreak, quizzesCompleted);

    // 📌 Save XP, streak, and last login in Firestore
    await updateDoc(userRef, {
      xp: newXP,
      streak: newStreak,
      lastLogin: today,
    });
  }
};
  
    // 📌 Save XP, streak, and last login in Firestore
    await updateDoc(userRef, {
      xp: newXP,
      streak: newStreak,
      lastLogin: today,
    });
  }
};

    // 📌 Save XP, streak, and last login in Firestore
    await updateDoc(userRef, {
      xp: newXP,
      streak: newStreak,
      lastLogin: today,
    });
  }
};


// Function to fetch leaderboard data with filtering
export const fetchLeaderboard = async (
  filter: "daily" | "weekly" | "all-time",
  searchQuery: string = "",
  userId: string | null = null
) => {
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
    let leaderboard = snapshot.docs.map((doc, index) => {
      const data = doc.data() as { email?: string; xp?: number };
      return {
        id: doc.id,
        email: data.email || "Unknown",
        xp: data.xp || 0,
        rank: index + 1,
      };
    });

    // ✅ Apply search filter
    if (searchQuery) {
      leaderboard = leaderboard.filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // ✅ Get Current User's Rank
    let currentUserRank = null;
    if (userId) {
      const allUsersQuery = query(collection(db, "users"), orderBy("xp", "desc"));
      const allUsersSnapshot = await getDocs(allUsersQuery);
      const allUsers = allUsersSnapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
      }));

      const currentUser = allUsers.find(user => user.id === userId);
      if (currentUser) {
        currentUserRank = currentUser.rank;
      }
    }

    return { leaderboard, currentUserRank };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { leaderboard: [], currentUserRank: null };
  }
};

//Create social post
export const createSocialPost = async (userId: string, type: "xp" | "streak" | "quiz", details: string) => {
  try {
    const postRef = doc(collection(db, "posts"));
    await setDoc(postRef, {
      userId,
      content: details,
      type,
      timestamp: new Date().toISOString(),
      reactions: {},
      comments: [],
    });
  } catch (error) {
    console.error("Error creating social post:", error);
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

//check achievements
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

    // 🏅 Update Firestore if new achievements are unlocked
    if (newAchievements.length > 0) {
      await updateDoc(userRef, {
        achievements: [...unlockedAchievements, ...newAchievements],
      });

      // 🚀 Create a social feed post for each new achievement
      newAchievements.forEach(async (achievement) => {
        await createSocialPost(userId, "achievement", `Unlocked: ${achievement}! 🎉`);
      });
    }
  } catch (error) {
    console.error("Error unlocking achievements:", error);
  }
};


// Export Firebase services
export { db, auth };  