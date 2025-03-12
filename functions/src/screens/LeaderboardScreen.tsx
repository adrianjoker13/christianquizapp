import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { fetchLeaderboard } from "../services/firebase";

const LeaderboardScreen = () => {
  interface LeaderboardEntry {
    id: string;
    email: string;
    xp: number;
  }
  
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"daily" | "weekly" | "all-time">("all-time");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(filter, searchQuery);
      setLeaderboard(data);
      setLoading(false);
    };
    loadLeaderboard();
  }, [filter, searchQuery]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>🏆 Leaderboard</Text>

      {/* Search Input */}
      <TextInput
        placeholder="Search by email..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

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
