import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { updateXPStreakAndBadges, logQuizCompletion, logXPEarned } from "../services/firebase";

const QuizScreen = ({ navigation }: any) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const quizId = "12345"; // Replace with actual quiz ID

  const handleQuizCompletion = async () => {
    if (quizCompleted) return;

    try {
      const xpGained = 10;
      await updateXPStreakAndBadges(xpGained);
      logQuizCompletion(quizId, 100);
      logXPEarned(xpGained);

      setQuizCompleted(true);
      Alert.alert("Great job!", `You earned ${xpGained} XP!`);

      setTimeout(() => {
        navigation.navigate("Home");
      }, 1500);
    } catch (error) {
      Alert.alert("Error", "Could not update XP.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Complete the quiz to earn XP!</Text>
      <Button title="Finish Quiz" onPress={handleQuizCompletion} />
    </View>
  );
};

export default QuizScreen;
