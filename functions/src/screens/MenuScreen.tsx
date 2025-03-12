import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Quiz</Text>

      <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('MultipleChoiceQuiz')}>
        <Text style={styles.buttonText}>📚 Multiple Choice Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('FillInTheBlankQuiz')}>
        <Text style={styles.buttonText}>✍️ Fill in the Blank Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('BibleTimelineQuiz')}>
        <Text style={styles.buttonText}>📜 Bible Timeline Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  quizButton: { // ✅ ADDED MISSING STYLE
    backgroundColor: '#007BFF',
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
