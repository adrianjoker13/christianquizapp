import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { updateXPAndStreak } from "../services/firebase";
import { useAppContext } from "../context/AppContext";

const QuizScreen = ({ navigation }: any) => {
  const { setUser, user } = useAppContext();
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizCompletion = async () => {
    if (quizCompleted) return;

    try {
      await updateXPAndStreak(10); // Add 10 XP per completed quiz
      setQuizCompleted(true);

      // Update local user state
      setUser({
        ...user,
        xp: user.xp + 10,
        streak: user.streak + 1,
      });

      Alert.alert("Great job!", "You earned 10 XP!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Could not update XP.");
    }
  };

  return (
    <View>
      <Text>Complete the quiz to earn XP!</Text>
      <Button title="Finish Quiz" onPress={handleQuizCompletion} />
    </View>
  );
};

export default QuizScreen;
