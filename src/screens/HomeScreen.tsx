import React from "react";
import { View, Text, Button } from "react-native";
import { useAppContext } from "../context/AppContext";

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAppContext();

  return (
    <View>
      <Text>Welcome, {user?.email}!</Text>
      <Text>🔥 Streak: {user?.streak || 0} days</Text>
      <Text>⭐ XP: {user?.xp || 0}</Text>
      <Button title="Start Quiz" onPress={() => navigation.navigate("Quiz")} />
      <Button title="View Leaderboard" onPress={() => navigation.navigate("Leaderboard")} />
    </View>
  );
};

export default HomeScreen;
