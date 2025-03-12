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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../services/firebase");
const ProgressBar_1 = __importDefault(require("../components/ProgressBar"));
const CustomButton_1 = __importDefault(require("../components/CustomButton"));
const AnswerSlot_1 = __importDefault(require("../components/AnswerSlot"));
const QuizOption_1 = __importDefault(require("../components/QuizOption"));
function FillInTheBlankQuiz({ navigation }) {
    var _a, _b;
    const [questions, setQuestions] = (0, react_1.useState)([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = (0, react_1.useState)(0);
    const [selectedAnswer, setSelectedAnswer] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        function fetchQuestions() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'fillInTheBlankQuestions'));
                    const quizData = querySnapshot.docs.map((doc) => doc.data());
                    if (quizData.length > 0) {
                        setQuestions(quizData);
                    }
                    setLoading(false);
                }
                catch (error) {
                    console.error('Error fetching fill-in-the-blank questions: ', error);
                    setLoading(false);
                }
            });
        }
        fetchQuestions();
    }, []);
    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };
    const handleConfirm = () => {
        var _a;
        if (selectedAnswer === ((_a = questions[currentQuestionIndex]) === null || _a === void 0 ? void 0 : _a.correctAnswer)) {
            react_native_1.Alert.alert('🎉 Correct!', 'Great job!');
            setTimeout(() => {
                if (currentQuestionIndex + 1 < questions.length) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                }
                else {
                    navigation.goBack();
                }
            }, 1000);
        }
        else {
            react_native_1.Alert.alert('❌ Incorrect', 'Try again!');
            setSelectedAnswer(null);
        }
    };
    if (loading) {
        return (<react_native_1.View style={styles.centered}>
        <react_native_1.ActivityIndicator size="large" color="#0000ff"/>
      </react_native_1.View>);
    }
    return (<react_native_1.View style={styles.container}>
      <ProgressBar_1.default progress={((currentQuestionIndex + 1) / questions.length) * 100}/>
      <react_native_1.Text style={styles.question}>{(_a = questions[currentQuestionIndex]) === null || _a === void 0 ? void 0 : _a.sentence.replace('___', '⬜')}</react_native_1.Text>
      
      <react_native_1.View style={styles.answerContainer}>
        <AnswerSlot_1.default text={selectedAnswer}/>
      </react_native_1.View>

      <react_native_1.View style={styles.optionsContainer}>
        {(_b = questions[currentQuestionIndex]) === null || _b === void 0 ? void 0 : _b.options.map((option, index) => (<QuizOption_1.default key={index} text={option} onPress={() => handleSelectAnswer(option)}/>))}
      </react_native_1.View>

      {selectedAnswer && <CustomButton_1.default title="Confirm" onPress={handleConfirm}/>}
    </react_native_1.View>);
}
exports.default = FillInTheBlankQuiz;
const styles = react_native_1.StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    question: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    answerContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
    optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
