// src/components/QuestionHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface QuestionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  category?: string;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ currentQuestion, totalQuestions, category }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Quiz Category (Optional) */}
      {category && <Text style={styles.categoryText}>{category}</Text>}

      {/* Question Progress */}
      <Text style={styles.questionText}>Question {currentQuestion} of {totalQuestions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Header container that holds the back button, category, and question progress
  headerContainer: {
    flexDirection: 'row', // Arranges items in a row
    alignItems: 'center', // Centers items vertically
    justifyContent: 'space-between', // Spaces out items evenly
    paddingVertical: 10, // Adds padding above and below
    paddingHorizontal: 20, // Adds padding on the sides
    backgroundColor: '#007BFF', // Blue background (change to match your theme)
  },

  // Back button (← icon)
  backButton: {
    backgroundColor: 'white', // White background for contrast
    width: 35, // Circular button size
    height: 35,
    borderRadius: 20, // Makes it circular
    alignItems: 'center', // Centers text
    justifyContent: 'center',
  },

  // Text inside the back button (← symbol)
  backButtonText: {
    fontSize: 20,
    color: '#007BFF', // Matches the header background
    fontWeight: 'bold',
  },

  // Category text (e.g., "Bible Trivia")
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // White text for contrast
  },

  // Question number text (e.g., "Question 3 of 10")
  questionText: {
    fontSize: 16,
    color: 'white', // White text for contrast
    fontWeight: 'bold',
  },
});

export default QuestionHeader;
