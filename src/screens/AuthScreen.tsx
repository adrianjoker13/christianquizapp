import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signUp, login, db } from "../services/firebase";
import { useAppContext } from "../context/AppContext";
import { doc, getDoc } from "firebase/firestore";

const AuthScreen = ({ navigation }: any) => {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await login(email, password);
      } else {
        userCredential = await signUp(email, password);
      }

      // Fetch user data from Firestore and update context
      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }

      navigation.replace("Home"); // Redirect to home screen
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <Text>{isLogin ? "Login" : "Sign Up"}</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={isLogin ? "Login" : "Sign Up"} onPress={handleAuth} />
      <Button title={isLogin ? "Create an account" : "Already have an account?"} onPress={() => setIsLogin(!isLogin)} />
    </View>
  );
};

export default AuthScreen;
