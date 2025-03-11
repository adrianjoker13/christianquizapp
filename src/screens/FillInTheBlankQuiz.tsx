import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProgressBar from '../components/ProgressBar';
import CustomButton from '../components/CustomButton';
import AnswerSlot from '../components/AnswerSlot';
import QuizOption from '../components/QuizOption';

export default function FillInTheBlankQuiz({ navigation }: any) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const querySnapshot = await getDocs(collection(db, 'fillInTheBlankQuestions'));
        const quizData = querySnapshot.docs.map((doc) => doc.data());

        if (quizData.length > 0) {
          setQuestions(quizData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching fill-in-the-blank questions: ', error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleConfirm = () => {
    if (selectedAnswer === questions[currentQuestionIndex]?.correctAnswer) {
      Alert.alert('🎉 Correct!', 'Great job!');
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
        } else {
          navigation.goBack();
        }
      }, 1000);
    } else {
      Alert.alert('❌ Incorrect', 'Try again!');
      setSelectedAnswer(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={((currentQuestionIndex + 1) / questions.length) * 100} />
      <Text style={styles.question}>{questions[currentQuestionIndex]?.sentence.replace('___', '⬜')}</Text>
      
      <View style={styles.answerContainer}>
        <AnswerSlot text={selectedAnswer} />
      </View>

      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex]?.options.map((option: string, index: number) => (
          <QuizOption key={index} text={option} onPress={() => handleSelectAnswer(option)} />
        ))}
      </View>

      {selectedAnswer && <CustomButton title="Confirm" onPress={handleConfirm} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  question: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  answerContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});