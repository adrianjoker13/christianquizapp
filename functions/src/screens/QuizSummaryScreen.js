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
const QuizSummaryScreen = ({ route, navigation }) => {
    const { user } = (0, AppContext_1.useAppContext)();
    const { score, totalQuestions, newXP, newBadges } = route.params;
    const fadeAnim = new react_native_1.Animated.Value(0);
    (0, react_1.useEffect)(() => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    return (<react_native_1.Animated.View style={{ opacity: fadeAnim, padding: 20 }}>
      <react_native_1.Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Quiz Summary</react_native_1.Text>
      <react_native_1.Text style={{ fontSize: 18 }}>📋 Score: {score} / {totalQuestions}</react_native_1.Text>
      <react_native_1.Text style={{ fontSize: 18 }}>⭐ XP Earned: {newXP}</react_native_1.Text>

      {newBadges.length > 0 && (<>
          <react_native_1.Text style={{ fontSize: 20, marginTop: 10 }}>🏅 New Achievements:</react_native_1.Text>
          <react_native_1.FlatList data={newBadges} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <react_native_1.Text>✅ {item}</react_native_1.Text>}/>
        </>)}

      <react_native_1.Button title="Back to Home" onPress={() => navigation.navigate("Home")}/>
    </react_native_1.Animated.View>);
};
exports.default = QuizSummaryScreen;
