import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Define the props interface
interface StreakTrackerProps {
  userId: string; // The user's unique identifier
  customFireIcon?: string; // Optional custom fire icon
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ userId, customFireIcon }) => {
  const [streak, setStreak] = useState<number>(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchStreak = async () => {
      if (!userId) return;

      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setStreak(data.streak || 0);
        setLastActiveDate(data.lastActiveDate || null);
      } else {
        await setDoc(userRef, { streak: 0, lastActiveDate: null });
      }
    };

    fetchStreak();
  }, [userId]);

  const updateStreak = async () => {
    if (!userId) return;

    const today: string = new Date().toISOString().split("T")[0];
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const lastDate: string | null = data.lastActiveDate || null;

      if (lastDate === today) {
        return; // Streak already updated today
      }
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString: string = yesterday.toISOString().split("T")[0];

      let newStreak = lastDate === yesterdayString ? data.streak + 1 : 1;
      await updateDoc(userRef, { streak: newStreak, lastActiveDate: today });
      setStreak(newStreak);
      setLastActiveDate(today);
    }
  };

  return (
    <View style={styles.container}>
      {/* Use the custom fire icon if provided, otherwise fallback to the emoji */}
      {customFireIcon ? (
        <Image source={{ uri: customFireIcon }} style={styles.fireIcon} />
      ) : (
        <Text style={styles.streakText}>🔥</Text>
      )}
      <Text style={styles.streakText}> Streak: {streak} days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row", // Aligns text and icon side by side
  },
  streakText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF8C00", // Orange color to represent fire 🔥
  },
  fireIcon: {
    width: 24, // Adjust this for your custom icon size
    height: 24,
    marginRight: 5, // Space between icon and text
  },
});

export default StreakTracker;