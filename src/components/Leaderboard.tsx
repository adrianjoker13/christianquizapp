import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Define the structure of a user in the leaderboard
interface LeaderboardUser {
  id: string;
  name: string;
  totalXP: number;
  weeklyXP: number;
  optInLeaderboard: boolean;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]); // State to store leaderboard data
  const [filter, setFilter] = useState("allTime"); // "allTime" or "weekly"
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [userId, setUserId] = useState<string | null>(null); // Store logged-in user ID
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    // Get the logged-in user's ID
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  useEffect(() => {
    // Fetch leaderboard data from Firestore
    const fetchLeaderboard = async () => {
      let leaderboardQuery;
      if (filter === "weekly") {
        // Get users ordered by XP earned in the last 7 days
        leaderboardQuery = query(collection(db, "users"), where("optInLeaderboard", "==", true), orderBy("weeklyXP", "desc"));
      } else {
        // Get users ordered by all-time XP
        leaderboardQuery = query(collection(db, "users"), where("optInLeaderboard", "==", true), orderBy("totalXP", "desc"));
      }
      const querySnapshot = await getDocs(leaderboardQuery);
      const leaderboardData: LeaderboardUser[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as LeaderboardUser));
      setUsers(leaderboardData);
    };

    fetchLeaderboard();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {/* Filter buttons for Weekly or All-Time XP */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter("weekly")} style={[styles.filterButton, filter === "weekly" && styles.activeFilter]}>
          <Text>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("allTime")} style={[styles.filterButton, filter === "allTime" && styles.activeFilter]}>
          <Text>All Time</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a user..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Leaderboard list */}
      <FlatList
        data={users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.userContainer, userId === item.id && styles.highlightUser]}> {/* Highlight the logged-in user */}
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userXP}>{filter === "weekly" ? item.weeklyXP : item.totalXP} XP</Text>
            {/* Show achievement badge if user reaches a milestone */}
            {index < 3 && <Text style={styles.badge}>{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</Text>}
          </View>
        )}
      />

      {/* Celebrate Button (For Future Implementation) */}
      {/* <TouchableOpacity onPress={() => celebrate(userId)}>
        <Text style={styles.celebrateButton}>🎉 Celebrate a Friend</Text>
      </TouchableOpacity> */}

      {/* Monthly Opt-In Reminder (For Future Implementation) */}
      {/* setTimeout(() => {
        if (!user.optInLeaderboard) {
          alert("Would you like to join the leaderboard?");
        }
      }, 30 * 24 * 60 * 60 * 1000); // Every 30 days */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  searchBar: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 5,
    borderRadius: 5,
  },
  highlightUser: {
    backgroundColor: "#FFFF99", // Highlight logged-in user
  },
  rank: {
    fontWeight: "bold",
  },
  userName: {
    flex: 1,
  },
  userXP: {
    fontWeight: "bold",
  },
  badge: {
    fontSize: 18,
  },
  celebrateButton: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Leaderboard;