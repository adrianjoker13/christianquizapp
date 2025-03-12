"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/ProgressBar.tsx
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ProgressBar = ({ progress }) => {
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={[styles.progress, { width: `${progress}%` }]}/>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 15,
    },
    progress: {
        height: '100%',
        backgroundColor: '#007BFF',
    },
});
exports.default = ProgressBar;
