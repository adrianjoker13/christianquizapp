import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const QuizSummaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { score, total } = route.params as { score: number; total: number };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.score}>
        You scored {score} out of {total}
      </Text>

      <Text style={styles.message}>🎉 Great job! Your XP and streak have been updated.</Text>

      <View style={styles.button}>
        <Button title="Return Home" onPress={() => navigation.navigate("Home" as never)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    width: "100%",
  },
});

export default QuizSummaryScreen;
