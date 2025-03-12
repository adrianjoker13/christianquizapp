"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/QuestionHeader.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const native_1 = require("@react-navigation/native");
const QuestionHeader = ({ currentQuestion, totalQuestions, category }) => {
    const navigation = (0, native_1.useNavigation)();
    return (<react_native_1.View style={styles.headerContainer}>
      {/* Back Button */}
      <react_native_1.TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <react_native_1.Text style={styles.backButtonText}>←</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      {/* Quiz Category (Optional) */}
      {category && <react_native_1.Text style={styles.categoryText}>{category}</react_native_1.Text>}

      {/* Question Progress */}
      <react_native_1.Text style={styles.questionText}>Question {currentQuestion} of {totalQuestions}</react_native_1.Text>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    // Header container that holds the back button, category, and question progress
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF', // Blue background (change to match your theme)
    },
    // Back button (← icon)
    backButton: {
        backgroundColor: 'white',
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Text inside the back button (← symbol)
    backButtonText: {
        fontSize: 20,
        color: '#007BFF',
        fontWeight: 'bold',
    },
    // Category text (e.g., "Bible Trivia")
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', // White text for contrast
    },
    // Question number text (e.g., "Question 3 of 10")
    questionText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});
exports.default = QuestionHeader;
