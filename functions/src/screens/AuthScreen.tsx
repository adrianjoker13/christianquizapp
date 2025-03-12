import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { auth, db } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Function to handle login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // ✅ Function to handle signup & save user data in Firestore
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        xp: 0,
        streak: 0,
      });

      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Enter email" 
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Text>Password:</Text>
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Enter password" 
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default AuthScreen;
