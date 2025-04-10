import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { quizSample } from "../mockData/quizSample";
import QuizOption from "../components/QuizOption";
import { updateXPStreakAndBadges, logQuizCompletion, logXPEarned } from "../services/firebase";

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const navigation = useNavigation();
  const currentQuestion = quizSample[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const handleNext = async () => {
    if (currentQuestionIndex + 1 < quizSample.length) {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      // Quiz completed
      if (!quizCompleted) {
        try {
          const xpEarned = score * 10; // Example: 10 XP per correct answer
          const quizzesCompleted = 1;
          const quizId = "sample_quiz_mock";

          await updateXPStreakAndBadges(xpEarned, quizzesCompleted);
          logXPEarned(xpEarned);
          logQuizCompletion(quizId, score);

          setQuizCompleted(true);
        } catch (error) {
          console.error("Error updating XP:", error);
          Alert.alert("Error", "There was an issue updating your progress.");
        }
      }

      navigation.navigate("QuizSummary" as never, {
        score,
        total: quizSample.length,
      } as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Question {currentQuestionIndex + 1}</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option) => (
        <QuizOption
          key={option}
          option={option}
          isSelected={selectedOption === option}
          isCorrect={selectedOption === option ? isCorrect : null}
          onPress={() => handleOptionPress(option)}
        />
      ))}

      {selectedOption && (
        <View style={styles.nextButton}>
          <Button title="Next" onPress={handleNext} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  nextButton: {
    marginTop: 20,
  },
});

export default QuizScreen;
