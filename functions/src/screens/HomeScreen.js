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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const AppContext_1 = require("../context/AppContext");
const HomeScreen = ({ navigation }) => {
    var _a;
    const { user } = (0, AppContext_1.useAppContext)();
    const fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(() => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    return (<react_native_1.Animated.View style={{ opacity: fadeAnim, padding: 20 }}>
      <react_native_1.Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Welcome, {user === null || user === void 0 ? void 0 : user.email}!
      </react_native_1.Text>
      <react_native_1.Text style={{ fontSize: 18 }}>🔥 Streak: {(user === null || user === void 0 ? void 0 : user.streak) || 0} days</react_native_1.Text>
      <react_native_1.Text style={{ fontSize: 18 }}>⭐ XP: {(user === null || user === void 0 ? void 0 : user.xp) || 0}</react_native_1.Text>

      <react_native_1.Text style={{ fontSize: 20, marginTop: 10 }}>🏅 Achievements:</react_native_1.Text>
      {((_a = user === null || user === void 0 ? void 0 : user.achievements) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (<react_native_1.FlatList data={user.achievements} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (<react_native_1.Text style={{ fontSize: 16, color: "#FFD700" }}>✅ {item}</react_native_1.Text>)}/>) : (<react_native_1.Text>No achievements yet. Keep going! 🚀</react_native_1.Text>)}

      <react_native_1.View style={{ marginTop: 20 }}>
        <react_native_1.Button title="Start Quiz" onPress={() => navigation.navigate("Quiz")}/>
        <react_native_1.Button title="View Leaderboard" onPress={() => navigation.navigate("Leaderboard")}/>
      </react_native_1.View>
    </react_native_1.Animated.View>);
};
exports.default = HomeScreen;
