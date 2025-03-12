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
exports.useAppContext = exports.AppProvider = void 0;
const react_1 = __importStar(require("react"));
const firebase_1 = require("../services/firebase");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const AppContext = (0, react_1.createContext)(undefined);
const AppProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const unsubscribeAuth = (0, auth_1.onAuthStateChanged)(firebase_1.auth, (firebaseUser) => __awaiter(void 0, void 0, void 0, function* () {
            if (firebaseUser) {
                const userRef = (0, firestore_1.doc)(firebase_1.db, "users", firebaseUser.uid);
                // Real-time listener for user data
                const unsubscribeFirestore = (0, firestore_1.onSnapshot)(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                    }
                    setLoading(false);
                });
                return () => unsubscribeFirestore();
            }
            else {
                setUser(null);
                setLoading(false);
            }
        }));
        return () => unsubscribeAuth();
    }, []);
    return (<AppContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AppContext.Provider>);
};
exports.AppProvider = AppProvider;
const useAppContext = () => {
    const context = (0, react_1.useContext)(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
exports.useAppContext = useAppContext;
