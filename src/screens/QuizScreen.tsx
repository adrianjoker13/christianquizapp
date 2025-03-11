import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Alert, Animated } from "react-native";
import { updateXPStreakAndBadges } from "../services/firebase";
import { useAppContext } from "../context/AppContext";

const QuizScreen = ({ navigation }: any) => {
  const { setUser, user } = useAppContext();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const xpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (quizCompleted) {
      Animated.timing(xpAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [quizCompleted]);

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
    </
