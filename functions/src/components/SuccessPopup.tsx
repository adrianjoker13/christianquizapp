import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, Platform } from "react-native";

// Define the props for the SuccessPopup component
interface SuccessPopupProps {
  visible: boolean; // Controls visibility of the popup
  message: string; // Message to be displayed
  onClose: () => void; // Function to handle closing the popup
}

// SuccessPopup functional component
const SuccessPopup: React.FC<SuccessPopupProps> = ({ visible, message, onClose }) => {
  // Define request close behavior only for Android
  const handleRequestClose = Platform.OS === "android" ? onClose : undefined;

  return (
    <Modal
      transparent={true} // Ensures the background remains visible with an overlay
      animationType="fade" // Provides a smooth fade-in effect
      visible={visible} // Controls whether the popup is shown or hidden
      onRequestClose={handleRequestClose} // Ensures onRequestClose is only set on Android
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.successText}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles for the popup component
const styles = StyleSheet.create({
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

export default SuccessPopup;
