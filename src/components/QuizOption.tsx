// src/components/QuizOption.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface QuizOptionProps {
  text: string;
  onPress: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionButton} onPress={onPress}>
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default QuizOption;
