// src/components/AnswerSlot.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AnswerSlotProps {
  text?: string | null; // Allow null values
}

const AnswerSlot: React.FC<AnswerSlotProps> = ({ text }) => {
  return (
    <View style={styles.slot}>
      <Text style={styles.slotText}>{text ?? '⬜'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AnswerSlot;