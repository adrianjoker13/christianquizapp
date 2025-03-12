"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
// SuccessPopup functional component
const SuccessPopup = ({ visible, message, onClose }) => {
    // Define request close behavior only for Android
    const handleRequestClose = react_native_1.Platform.OS === "android" ? onClose : undefined;
    return (<react_native_1.Modal transparent={true} // Ensures the background remains visible with an overlay
     animationType="fade" // Provides a smooth fade-in effect
     visible={visible} // Controls whether the popup is shown or hidden
     onRequestClose={handleRequestClose} // Ensures onRequestClose is only set on Android
    >
      <react_native_1.View style={styles.overlay}>
        <react_native_1.View style={styles.popupContainer}>
          <react_native_1.Text style={styles.successText}>{message}</react_native_1.Text>
          <react_native_1.TouchableOpacity style={styles.button} onPress={onClose}>
            <react_native_1.Text style={styles.buttonText}>OK</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
// Styles for the popup component
const styles = react_native_1.StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popupContainer: {
        width: "80%",
        backgroundColor: "#dff0d8",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    successText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3c763d",
        textAlign: "center",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
exports.default = SuccessPopup;
