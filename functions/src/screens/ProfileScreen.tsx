import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<{ email: string; xp: number; streak: number; achievements: string[] }>({
    email: "",
    xp: 0,
    streak: 0,
    achievements: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as { email: string; xp: number; streak: number; achievements: string[] });
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>👤 Profile</Text>
      <Image source={{ uri: `https://api.dicebear.com/6.x/initials/svg?seed=${userData.email}` }} style={{ width: 80, height: 80, borderRadius: 40, marginTop: 10 }} />
      <Text>Email: {userData.email}</Text>
      <Text>XP: {userData.xp}</Text>
      <Text>Streak: {userData.streak}🔥</Text>

      {/* Display Achievements */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>🏅 Achievements</Text>
      {userData.achievements.length > 0 ? (
        userData.achievements.map((badge, index) => (
          <Text key={index} style={{ fontSize: 16 }}>• {badge}</Text>
        ))
      ) : (
        <Text>No achievements yet.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
