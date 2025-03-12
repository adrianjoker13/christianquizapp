"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function MenuScreen({ navigation }) {
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Choose a Quiz</react_native_1.Text>

      <react_native_1.TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('MultipleChoiceQuiz')}>
        <react_native_1.Text style={styles.buttonText}>📚 Multiple Choice Quiz</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('FillInTheBlankQuiz')}>
        <react_native_1.Text style={styles.buttonText}>✍️ Fill in the Blank Quiz</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('BibleTimelineQuiz')}>
        <react_native_1.Text style={styles.buttonText}>📜 Bible Timeline Quiz</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
exports.default = MenuScreen;
const styles = react_native_1.StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    quizButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
