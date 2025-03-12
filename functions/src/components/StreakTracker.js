"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
const StreakTracker = ({ userId, customFireIcon }) => {
    const [streak, setStreak] = (0, react_1.useState)(0);
    const [lastActiveDate, setLastActiveDate] = (0, react_1.useState)(null);
    const db = (0, firestore_1.getFirestore)();
    const auth = (0, auth_1.getAuth)();
    (0, react_1.useEffect)(() => {
        const fetchStreak = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!userId)
                return;
            const userRef = (0, firestore_1.doc)(db, "users", userId);
            const userSnap = yield (0, firestore_1.getDoc)(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                setStreak(data.streak || 0);
                setLastActiveDate(data.lastActiveDate || null);
            }
            else {
                yield (0, firestore_1.setDoc)(userRef, { streak: 0, lastActiveDate: null });
            }
        });
        fetchStreak();
    }, [userId]);
    const updateStreak = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!userId)
            return;
        const today = new Date().toISOString().split("T")[0];
        const userRef = (0, firestore_1.doc)(db, "users", userId);
        const userSnap = yield (0, firestore_1.getDoc)(userRef);
        if (userSnap.exists()) {
            const data = userSnap.data();
            const lastDate = data.lastActiveDate || null;
            if (lastDate === today) {
                return; // Streak already updated today
            }
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split("T")[0];
            let newStreak = lastDate === yesterdayString ? data.streak + 1 : 1;
            yield (0, firestore_1.updateDoc)(userRef, { streak: newStreak, lastActiveDate: today });
            setStreak(newStreak);
            setLastActiveDate(today);
        }
    });
    return (<react_native_1.View style={styles.container}>
      {/* Use the custom fire icon if provided, otherwise fallback to the emoji */}
      {customFireIcon ? (<react_native_1.Image source={{ uri: customFireIcon }} style={styles.fireIcon}/>) : (<react_native_1.Text style={styles.streakText}>🔥</react_native_1.Text>)}
      <react_native_1.Text style={styles.streakText}> Streak: {streak} days</react_native_1.Text>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
        flexDirection: "row", // Aligns text and icon side by side
    },
    streakText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FF8C00", // Orange color to represent fire 🔥
    },
    fireIcon: {
        width: 24,
        height: 24,
        marginRight: 5, // Space between icon and text
    },
});
exports.default = StreakTracker;
