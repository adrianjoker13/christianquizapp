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
const firebase_1 = require("../services/firebase"); // Ensure this is the correct path
const ProgressBar_1 = __importDefault(require("../components/ProgressBar")); // Import the progress bar
function MultipleChoiceQuiz({ navigation }) {
    const [questions, setQuestions] = (0, react_1.useState)([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = (0, react_1.useState)(0);
    const [selectedOption, setSelectedOption] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    // ✅ Fetch questions from Firestore when the screen loads
    (0, react_1.useEffect)(() => {
        function fetchQuestions() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'quizQuestions'));
                    const quizData = querySnapshot.docs.map((doc) => doc.data());
                    setQuestions(quizData);
                    setLoading(false);
                }
                catch (error) {
                    console.error("Error fetching questions: ", error);
                    setLoading(false);
                }
            });
        }
        fetchQuestions();
    }, []);
    // ✅ Show a loading spinner while fetching data
    if (loading) {
        return (<react_native_1.View style={styles.centered}>
        <react_native_1.ActivityIndicator size="large" color="#0000ff"/>
      </react_native_1.View>);
    }
    // ✅ If no questions exist in Firestore
    if (questions.length === 0) {
        return (<react_native_1.View style={styles.centered}>
        <react_native_1.Text>No questions found in the database.</react_native_1.Text>
      </react_native_1.View>);
    }
    // ✅ Get current question data
    const currentQuestion = questions[currentQuestionIndex];
    const { questionText, options, correctAnswer } = currentQuestion;
    // ✅ Handle option selection
    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };
    // ✅ Handle answer confirmation
    const handleConfirm = () => {
        if (selectedOption === correctAnswer) {
            react_native_1.Alert.alert("Correct!", "You got it right! 🎉");
            // Move to next question or finish quiz
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null); // Reset selection for next question
            }
            else {
                react_native_1.Alert.alert("Quiz Completed", "You've answered all questions! 🎉", [
                    { text: "Return to Menu", onPress: () => navigation.goBack() },
                ]);
            }
        }
        else {
            react_native_1.Alert.alert("Incorrect", "Try again! ❌");
        }
    };
    return (<react_native_1.View style={styles.container}>
      {/* ✅ Progress Bar */}
      <ProgressBar_1.default progress={(currentQuestionIndex + 1) / questions.length * 100}/>

      {/* ✅ Display Question */}
      <react_native_1.Text style={styles.question}>{questionText}</react_native_1.Text>

      {/* ✅ Display Answer Options */}
      {options.map((option, index) => (<react_native_1.TouchableOpacity key={index} style={[
                styles.option,
                selectedOption === option && styles.selectedOption,
            ]} onPress={() => handleSelectOption(option)}>
          <react_native_1.Text style={styles.optionText}>{option}</react_native_1.Text>
        </react_native_1.TouchableOpacity>))}

      {/* ✅ Confirm Button */}
      {selectedOption && (<react_native_1.TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <react_native_1.Text style={styles.confirmButtonText}>Confirm</react_native_1.Text>
        </react_native_1.TouchableOpacity>)}
    </react_native_1.View>);
}
exports.default = MultipleChoiceQuiz;
// ✅ Styles
const styles = react_native_1.StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    question: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    option: { backgroundColor: '#ddd', padding: 15, marginVertical: 5, width: '80%', alignItems: 'center', borderRadius: 5 },
    optionText: { fontSize: 18 },
    selectedOption: { backgroundColor: '#5CB85C' },
    confirmButton: { marginTop: 20, backgroundColor: '#007BFF', padding: 15, borderRadius: 5 },
    confirmButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
