import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProgressBar from '../components/ProgressBar';
import CustomButton from '../components/CustomButton';
import AnswerSlot from '../components/AnswerSlot';
import QuizOption from '../components/QuizOption';

export default function BibleTimelineQuiz({ navigation }: any) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [events, setEvents] = useState<string[]>([]);
  const [correctOrder, setCorrectOrder] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<(string | null)[]>([null, null, null, null]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const querySnapshot = await getDocs(collection(db, 'bibleTimelineQuestions'));
        const quizData = querySnapshot.docs.map((doc) => doc.data());

        if (quizData.length > 0) {
          setQuestions(quizData);
          const shuffledEvents = [...quizData[0].events].sort(() => Math.random() - 0.5);
          setEvents(shuffledEvents);
          setCorrectOrder(quizData[0].correctOrder);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching timeline questions: ', error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleSelectEvent = (event: string) => {
    const nextSlot = selectedEvents.indexOf(null);
    if (nextSlot !== -1) {
      const updatedSelection = [...selectedEvents];
      updatedSelection[nextSlot] = event;
      setSelectedEvents(updatedSelection);
      setEvents(events.filter((e) => e !== event));
    }
  };

  const handleReset = () => {
    setSelectedEvents([null, null, null, null]);
    setEvents([...correctOrder].sort(() => Math.random() - 0.5));
  };

  const handleConfirm = () => {
    if (JSON.stringify(selectedEvents) === JSON.stringify(correctOrder)) {
      Alert.alert('🎉 Correct!', 'You arranged the events correctly!');
      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedEvents([null, null, null, null]);
          setEvents([...questions[currentQuestionIndex + 1].events].sort(() => Math.random() - 0.5));
          setCorrectOrder(questions[currentQuestionIndex + 1].correctOrder);
        } else {
          navigation.goBack();
        }
      }, 1000);
    } else {
      Alert.alert('❌ Incorrect', 'Try again!');
      handleReset();
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
      <Text style={styles.question}>{questions[currentQuestionIndex]?.question}</Text>
      
      <View style={styles.answerContainer}>
        {selectedEvents.map((event, index) => (
          <AnswerSlot key={index} text={event} />
        ))}
      </View>

      <View style={styles.optionsContainer}>
        {events.map((event, index) => (
          <QuizOption key={index} text={event} onPress={() => handleSelectEvent(event)} />
        ))}
      </View>

      <CustomButton title="Reset" onPress={handleReset} color="#FF5733" />

      {selectedEvents.every((slot) => slot !== null) && (
        <CustomButton title="Confirm" onPress={handleConfirm} />
      )}
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
