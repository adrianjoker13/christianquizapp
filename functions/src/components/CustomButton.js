"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/CustomButton.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CustomButton = ({ title, onPress, color = '#007BFF' }) => {
    return (<react_native_1.TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <react_native_1.Text style={styles.buttonText}>{title}</react_native_1.Text>
    </react_native_1.TouchableOpacity>);
};
const styles = react_native_1.StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
exports.default = CustomButton;
