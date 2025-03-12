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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const QuizTimer = ({ initialTime, onTimeUp }) => {
    // State to keep track of the remaining time
    const [timeLeft, setTimeLeft] = (0, react_1.useState)(initialTime);
    (0, react_1.useEffect)(() => {
        // If time reaches zero, trigger the onTimeUp callback and stop the timer
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }
        // Create an interval that decreases the timer every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        // Cleanup function: clears the interval when the component unmounts
        // or when timeLeft changes to prevent memory leaks
        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]); // Re-run effect when timeLeft or onTimeUp changes
    return (<react_native_1.View style={styles.container}> 
      {/* Timer display container */}
      <react_native_1.Text style={styles.timerText}>{timeLeft} seconds left</react_native_1.Text>
    </react_native_1.View>);
};
// Styles for the timer component
const styles = react_native_1.StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffdddd",
        borderRadius: 10,
        width: "50%",
        alignSelf: "center",
        marginTop: 10, // Adds some space above the timer
    },
    timerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#900000", // Dark red color for better readability
    },
});
exports.default = QuizTimer;
