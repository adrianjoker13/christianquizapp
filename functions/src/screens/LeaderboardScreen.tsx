import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { fetchLeaderboard } from "../services/firebase";



interface LeaderboardItem {
  id: string;
  email: string;
  xp: number;
}

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"daily" | "weekly" | "all-time">("all-time");

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(filter);
      setLeaderboard(data);
      setLoading(false);
    };
    loadLeaderboard();
  }, [filter]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>🏆 Leaderboard</Text>

      {/* Filter Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
        {["daily", "weekly", "all-time"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type as "daily" | "weekly" | "all-time")}
            style={{
              padding: 10,
              backgroundColor: filter === type ? "blue" : "gray",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1 }}>
            <Text>{index + 1}. {item.email}</Text>
            <Text>{item.xp} XP</Text>
          </View>
        )}
      />
    </View>
  );
};

export default LeaderboardScreen;
