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
const firebase_1 = require("../services/firebase");
const AppContext_1 = require("../context/AppContext");
const firestore_1 = require("firebase/firestore");
const AuthScreen = ({ navigation }) => {
    const { setUser } = (0, AppContext_1.useAppContext)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [isLogin, setIsLogin] = (0, react_1.useState)(true);
    const handleAuth = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let userCredential;
            if (isLogin) {
                userCredential = yield (0, firebase_1.login)(email, password);
            }
            else {
                userCredential = yield (0, firebase_1.signUp)(email, password);
            }
            // Fetch user data from Firestore and update context
            const userRef = (0, firestore_1.doc)(firebase_1.db, "users", userCredential.user.uid);
            const userSnap = yield (0, firestore_1.getDoc)(userRef);
            if (userSnap.exists()) {
                setUser(userSnap.data());
            }
            navigation.replace("Home"); // Redirect to home screen
        }
        catch (error) {
            react_native_1.Alert.alert("Error", error.message);
        }
    });
    return (<react_native_1.View>
      <react_native_1.Text>{isLogin ? "Login" : "Sign Up"}</react_native_1.Text>
      <react_native_1.TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
      <react_native_1.TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
      <react_native_1.Button title={isLogin ? "Login" : "Sign Up"} onPress={handleAuth}/>
      <react_native_1.Button title={isLogin ? "Create an account" : "Already have an account?"} onPress={() => setIsLogin(!isLogin)}/>
    </react_native_1.View>);
};
exports.default = AuthScreen;
