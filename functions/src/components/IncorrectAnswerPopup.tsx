// src/components/IncorrectAnswerPopup.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

interface IncorrectAnswerPopupProps {
  visible: boolean;
  onClose: () => void;
}

const IncorrectAnswerPopup: React.FC<IncorrectAnswerPopupProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.message}>❌ Incorrect! Try again.</Text>
          <CustomButton title="OK" onPress={onClose} color="#FF5733" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default IncorrectAnswerPopup;
