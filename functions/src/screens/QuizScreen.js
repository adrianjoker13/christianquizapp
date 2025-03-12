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
const QuizScreen = ({ navigation }) => {
    const [quizCompleted, setQuizCompleted] = (0, react_1.useState)(false);
    const quizId = "12345"; // Replace with actual quiz ID
    const handleQuizCompletion = () => __awaiter(void 0, void 0, void 0, function* () {
        if (quizCompleted)
            return;
        try {
            const xpGained = 10;
            yield (0, firebase_1.updateXPStreakAndBadges)(xpGained);
            (0, firebase_1.logQuizCompletion)(quizId, 100);
            (0, firebase_1.logXPEarned)(xpGained);
            setQuizCompleted(true);
            react_native_1.Alert.alert("Great job!", `You earned ${xpGained} XP!`);
            setTimeout(() => {
                navigation.navigate("Home");
            }, 1500);
        }
        catch (error) {
            react_native_1.Alert.alert("Error", "Could not update XP.");
        }
    });
    return (<react_native_1.View style={{ padding: 20 }}>
      <react_native_1.Text style={{ fontSize: 20, marginBottom: 10 }}>Complete the quiz to earn XP!</react_native_1.Text>
      <react_native_1.Button title="Finish Quiz" onPress={handleQuizCompletion}/>
    </react_native_1.View>);
};
exports.default = QuizScreen;
