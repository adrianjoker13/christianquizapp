"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/AnswerSlot.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const AnswerSlot = ({ text }) => {
    return (<react_native_1.View style={styles.slot}>
      <react_native_1.Text style={styles.slotText}>{text !== null && text !== void 0 ? text : '⬜'}</react_native_1.Text>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    slot: {
        width: 80,
        height: 40,
        borderWidth: 1,
        borderColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    slotText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
exports.default = AnswerSlot;
