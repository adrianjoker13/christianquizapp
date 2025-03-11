import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { fetchLeaderboard } from "../services/firebase";

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    getLeaderboard();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View>
      <Text>🏆 Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <Text>
              #{index + 1} {item.email} - {item.xp} XP
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default LeaderboardScreen;
