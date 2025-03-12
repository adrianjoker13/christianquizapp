import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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

  // ✅ Function to handle signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
