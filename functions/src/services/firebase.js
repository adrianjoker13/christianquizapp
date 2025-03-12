"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = exports.storage = exports.auth = exports.db = exports.app = exports.fetchLeaderboard = exports.updateXPStreakAndBadges = exports.logout = exports.login = exports.signUp = exports.updateFCMToken = exports.logXPEarned = exports.logQuizCompletion = void 0;
// firebase.ts
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
const storage_1 = require("firebase/storage");
const analytics_1 = require("firebase/analytics");
const messaging_1 = __importDefault(require("@react-native-firebase/messaging"));
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
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
const analytics = (0, analytics_1.getAnalytics)(app);
exports.analytics = analytics;
// Function to save user data in Firestore
const saveUserToFirestore = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = (0, firestore_1.doc)(db, "users", user.uid);
    const userSnap = yield (0, firestore_1.getDoc)(userRef);
    if (!userSnap.exists()) {
        yield (0, firestore_1.setDoc)(userRef, {
            email: user.email,
            xp: 0,
            streak: 0,
            achievements: [],
            createdAt: new Date().toISOString(),
        });
    }
});
// Function to log quiz completion event
const logQuizCompletion = (quizId, score) => {
    (0, analytics_1.logEvent)(analytics, "quiz_completed", {
        quiz_id: quizId,
        score: score,
        timestamp: new Date().toISOString(),
    });
};
exports.logQuizCompletion = logQuizCompletion;
// Function to log XP earned event
const logXPEarned = (xpAmount) => {
    (0, analytics_1.logEvent)(analytics, "xp_earned", {
        xp_amount: xpAmount,
        timestamp: new Date().toISOString(),
    });
};
exports.logXPEarned = logXPEarned;
// Function to request and store FCM token
const updateFCMToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, messaging_1.default)().getToken();
        const userRef = (0, firestore_1.doc)(db, "users", userId);
        yield (0, firestore_1.updateDoc)(userRef, { fcmToken: token });
        console.log("FCM token updated:", token);
    }
    catch (error) {
        console.error("Error updating FCM token:", error);
    }
});
exports.updateFCMToken = updateFCMToken;
// Signup Function
const signUp = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
    yield saveUserToFirestore(userCredential.user);
    return userCredential;
});
exports.signUp = signUp;
// Login Function
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
    return userCredential;
});
exports.login = login;
// Logout Function
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, auth_1.signOut)(auth);
});
exports.logout = logout;
// Function to determine badges based on XP
const getBadgesForXP = (xp) => {
    let badges = [];
    if (xp >= 100)
        badges.push("Bronze Achiever 🥉");
    if (xp >= 250)
        badges.push("Silver Champion 🥈");
    if (xp >= 500)
        badges.push("Gold Master 🥇");
    if (xp >= 1000)
        badges.push("Legendary Warrior 🔥");
    return badges;
};
// Function to update XP, streak, and badges
const updateXPStreakAndBadges = (xpEarned) => __awaiter(void 0, void 0, void 0, function* () {
    if (!auth.currentUser)
        return;
    const userRef = (0, firestore_1.doc)(db, "users", auth.currentUser.uid);
    const userSnap = yield (0, firestore_1.getDoc)(userRef);
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
            }
            else {
                newStreak = 1; // Reset streak
            }
        }
        // Calculate new XP and badges
        const newXP = (userData.xp || 0) + xpEarned;
        const newBadges = getBadgesForXP(newXP);
        yield (0, firestore_1.updateDoc)(userRef, {
            xp: newXP,
            streak: newStreak,
            lastLogin: today,
            achievements: newBadges,
        });
    }
});
exports.updateXPStreakAndBadges = updateXPStreakAndBadges;
// Function to fetch leaderboard data from Firestore leaderboard collection
const fetchLeaderboard = () => __awaiter(void 0, void 0, void 0, function* () {
    const leaderboardRef = (0, firestore_1.collection)(db, "leaderboard");
    const q = (0, firestore_1.query)(leaderboardRef, (0, firestore_1.orderBy)("xp", "desc"), (0, firestore_1.limit)(10));
    const snapshot = yield (0, firestore_1.getDocs)(q);
    let leaderboard = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        leaderboard.push({ id: doc.id, email: data.email, xp: data.xp });
    });
    return leaderboard;
});
exports.fetchLeaderboard = fetchLeaderboard;
