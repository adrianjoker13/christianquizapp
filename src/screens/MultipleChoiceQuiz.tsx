import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../services/firebase'; // Ensure this is the correct path
import ProgressBar from '../components/ProgressBar'; // Import the progress bar

export default function MultipleChoiceQuiz({ navigation }: any) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch questions from Firestore when the screen loads
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const querySnapshot = await getDocs(collection(db, 'quizQuestions'));
        const quizData = querySnapshot.docs.map((doc) => doc.data());
        setQuestions(quizData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  // ✅ Show a loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // ✅ If no questions exist in Firestore
  if (questions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No questions found in the database.</Text>
      </View>
    );
  }

  // ✅ Get current question data
  const currentQuestion = questions[currentQuestionIndex];
  const { questionText, options, correctAnswer } = currentQuestion;

  // ✅ Handle option selection
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  // ✅ Handle answer confirmation
  const handleConfirm = () => {
    if (selectedOption === correctAnswer) {
      Alert.alert("Correct!", "You got it right! 🎉");
      // Move to next question or finish quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reset selection for next question
      } else {
        Alert.alert("Quiz Completed", "You've answered all questions! 🎉", [
          { text: "Return to Menu", onPress: () => navigation.goBack() },
        ]);
      }
    } else {
      Alert.alert("Incorrect", "Try again! ❌");
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Progress Bar */}
      <ProgressBar progress={(currentQuestionIndex + 1) / questions.length * 100} />

      {/* ✅ Display Question */}
      <Text style={styles.question}>{questionText}</Text>

      {/* ✅ Display Answer Options */}
      {options.map((option: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => handleSelectOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* ✅ Confirm Button */}
      {selectedOption && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  question: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  option: { backgroundColor: '#ddd', padding: 15, marginVertical: 5, width: '80%', alignItems: 'center', borderRadius: 5 },
  optionText: { fontSize: 18 },
  selectedOption: { backgroundColor: '#5CB85C' },
  confirmButton: { marginTop: 20, backgroundColor: '#007BFF', padding: 15, borderRadius: 5 },
  confirmButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

