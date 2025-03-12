"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/IncorrectAnswerPopup.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CustomButton_1 = __importDefault(require("./CustomButton"));
const IncorrectAnswerPopup = ({ visible, onClose }) => {
    return (<react_native_1.Modal visible={visible} transparent animationType="fade">
      <react_native_1.View style={styles.overlay}>
        <react_native_1.View style={styles.popup}>
          <react_native_1.Text style={styles.message}>❌ Incorrect! Try again.</react_native_1.Text>
          <CustomButton_1.default title="OK" onPress={onClose} color="#FF5733"/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
const styles = react_native_1.StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});
exports.default = IncorrectAnswerPopup;
