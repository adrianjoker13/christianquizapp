import React, { useEffect } from "react";
import { View, Text, Button, FlatList, Animated } from "react-native";
import { useAppContext } from "../context/AppContext";

const QuizSummaryScreen = ({ route, navigation }: any) => {
  const { user } = useAppContext();
  const { score, totalQuestions, newXP, newBadges } = route.params;
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Quiz Summary</Text>
      <Text style={{ fontSize: 18 }}>📋 Score: {score} / {totalQuestions}</Text>
      <Text style={{ fontSize: 18 }}>⭐ XP Earned: {newXP}</Text>

      {newBadges.length > 0 && (
        <>
          <Text style={{ fontSize: 20, marginTop: 10 }}>🏅 New Achievements:</Text>
          <FlatList
            data={newBadges}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text>✅ {item}</Text>}
          />
        </>
      )}

      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </Animated.View>
  );
};

export default QuizSummaryScreen;
