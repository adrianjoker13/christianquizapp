"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/QuizOption.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const QuizOption = ({ text, onPress }) => {
    return (<react_native_1.TouchableOpacity style={styles.optionButton} onPress={onPress}>
      <react_native_1.Text style={styles.optionText}>{text}</react_native_1.Text>
    </react_native_1.TouchableOpacity>);
};
const styles = react_native_1.StyleSheet.create({
    optionButton: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007BFF',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
exports.default = QuizOption;
