import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface QuizOptionProps {
  option: string;
  isSelected: boolean;
  isCorrect: boolean | null;
  onPress: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ option, isSelected, isCorrect, onPress }) => {
  const getButtonStyle = () => {
    if (isCorrect === null) return styles.option;
    if (isCorrect && isSelected) return [styles.option, styles.correct];
    if (!isCorrect && isSelected) return [styles.option, styles.incorrect];
    return styles.option;
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={isCorrect !== null} style={getButtonStyle()}>
      <Text style={styles.optionText}>{option}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: "#eee",
    padding: 14,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  correct: {
    backgroundColor: "#d4edda",
    borderColor: "#28a745",
  },
  incorrect: {
    backgroundColor: "#f8d7da",
    borderColor: "#dc3545",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default QuizOption;
