import React, { useEffect, useRef } from "react";
import { View, Text, Button, FlatList, Animated } from "react-native";
import { useAppContext } from "../context/AppContext";

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAppContext();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Welcome, {user?.email}!
      </Text>
      <Text style={{ fontSize: 18 }}>🔥 Streak: {user?.streak || 0} days</Text>
      <Text style={{ fontSize: 18 }}>⭐ XP: {user?.xp || 0}</Text>

      <Text style={{ fontSize: 20, marginTop: 10 }}>🏅 Achievements:</Text>
      {user?.achievements?.length > 0 ? (
        <FlatList
          data={user.achievements}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, color: "#FFD700" }}>✅ {item}</Text>
          )}
        />
      ) : (
        <Text>No achievements yet. Keep going! 🚀</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Start Quiz" onPress={() => navigation.navigate("Quiz")} />
        <Button title="View Leaderboard" onPress={() => navigation.navigate("Leaderboard")} />
      </View>
    </Animated.View>
  );
};

export default HomeScreen;
