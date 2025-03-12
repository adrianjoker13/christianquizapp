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
function BibleTimelineQuiz({ navigation }) {
    var _a;
    const [questions, setQuestions] = (0, react_1.useState)([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = (0, react_1.useState)(0);
    const [events, setEvents] = (0, react_1.useState)([]);
    const [correctOrder, setCorrectOrder] = (0, react_1.useState)([]);
    const [selectedEvents, setSelectedEvents] = (0, react_1.useState)([null, null, null, null]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        function fetchQuestions() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'bibleTimelineQuestions'));
                    const quizData = querySnapshot.docs.map((doc) => doc.data());
                    if (quizData.length > 0) {
                        setQuestions(quizData);
                        const shuffledEvents = [...quizData[0].events].sort(() => Math.random() - 0.5);
                        setEvents(shuffledEvents);
                        setCorrectOrder(quizData[0].correctOrder);
                    }
                    setLoading(false);
                }
                catch (error) {
                    console.error('Error fetching timeline questions: ', error);
                    setLoading(false);
                }
            });
        }
        fetchQuestions();
    }, []);
    const handleSelectEvent = (event) => {
        const nextSlot = selectedEvents.indexOf(null);
        if (nextSlot !== -1) {
            const updatedSelection = [...selectedEvents];
            updatedSelection[nextSlot] = event;
            setSelectedEvents(updatedSelection);
            setEvents(events.filter((e) => e !== event));
        }
    };
    const handleReset = () => {
        setSelectedEvents([null, null, null, null]);
        setEvents([...correctOrder].sort(() => Math.random() - 0.5));
    };
    const handleConfirm = () => {
        if (JSON.stringify(selectedEvents) === JSON.stringify(correctOrder)) {
            react_native_1.Alert.alert('🎉 Correct!', 'You arranged the events correctly!');
            setTimeout(() => {
                if (currentQuestionIndex + 1 < questions.length) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedEvents([null, null, null, null]);
                    setEvents([...questions[currentQuestionIndex + 1].events].sort(() => Math.random() - 0.5));
                    setCorrectOrder(questions[currentQuestionIndex + 1].correctOrder);
                }
                else {
                    navigation.goBack();
                }
            }, 1000);
        }
        else {
            react_native_1.Alert.alert('❌ Incorrect', 'Try again!');
            handleReset();
        }
    };
    if (loading) {
        return (<react_native_1.View style={styles.centered}>
        <react_native_1.ActivityIndicator size="large" color="#0000ff"/>
      </react_native_1.View>);
    }
    return (<react_native_1.View style={styles.container}>
      <ProgressBar_1.default progress={((currentQuestionIndex + 1) / questions.length) * 100}/>
      <react_native_1.Text style={styles.question}>{(_a = questions[currentQuestionIndex]) === null || _a === void 0 ? void 0 : _a.question}</react_native_1.Text>
      
      <react_native_1.View style={styles.answerContainer}>
        {selectedEvents.map((event, index) => (<AnswerSlot_1.default key={index} text={event}/>))}
      </react_native_1.View>

      <react_native_1.View style={styles.optionsContainer}>
        {events.map((event, index) => (<QuizOption_1.default key={index} text={event} onPress={() => handleSelectEvent(event)}/>))}
      </react_native_1.View>

      <CustomButton_1.default title="Reset" onPress={handleReset} color="#FF5733"/>

      {selectedEvents.every((slot) => slot !== null) && (<CustomButton_1.default title="Confirm" onPress={handleConfirm}/>)}
    </react_native_1.View>);
}
exports.default = BibleTimelineQuiz;
const styles = react_native_1.StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    question: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    answerContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
    optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
