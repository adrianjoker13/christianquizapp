import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Alert, Animated } from "react-native";
import { updateXPStreakAndBadges } from "../services/firebase";
import { useAppContext } from "../context/AppContext";
import { Audio } from "expo-av";
import Haptics from "react-native-haptic-feedback";
import * as Progress from "react-native-progress";

const QuizScreen = ({ navigation }: any) => {
  const { setUser, user } = useAppContext();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];
  const xpAnim = useRef(new Animated.Value(0)).current;
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    if (quizCompleted) {
      Animated.timing(xpAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [quizCompleted]);

  const playSound = async () => {
    try {
      await sound.current.unloadAsync(); // Unload any previous sound
      await sound.current.loadAsync(require("../assets/success.mp3")); // Ensure you have this file
      await sound.current.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleAnswer = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setProgress((questionIndex + 1) / questions.length);
    } else {
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    if (quizCompleted) return;

    try {
      await updateXPStreakAndBadges(10);
      setQuizCompleted(true);

      Alert.alert("Great job!", "You earned 10 XP!");

      // Smooth XP increase
      setUser((prevUser: any) => ({
        ...prevUser,
        xp: prevUser.xp + 10,
      }));

      // Play sound and trigger haptic feedback
      playSound();
      Haptics.trigger("impactMedium", { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });

      setTimeout(() => {
        navigation.navigate("Home");
      }, 1500);
    } catch (error) {
      Alert.alert("Error", "Could not update XP.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{questions[questionIndex]}</Text>
      
      {/* Progress Bar */}
      <Progress.Bar progress={progress} width={null} height={10} color="blue" />

      <Button title="Answer Question" onPress={handleAnswer} />

      {quizCompleted && (
        <Animated.Text
          style={{
            fontSize: 22,
            color: "green",
            fontWeight: "bold",
            opacity: xpAnim,
            marginTop: 20,
          }}
        >
          +10 XP!
        </Animated.Text>
      )}
    </View>
  );
};

export default QuizScreen;
