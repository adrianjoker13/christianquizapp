import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// Define the props for the QuizTimer component
interface QuizTimerProps {
  initialTime: number; // Initial countdown time in seconds
  onTimeUp: () => void; // Function to handle when time runs out
}

const QuizTimer: React.FC<QuizTimerProps> = ({ initialTime, onTimeUp }) => {
  // State to keep track of the remaining time
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    // If time reaches zero, trigger the onTimeUp callback and stop the timer
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    // Create an interval that decreases the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime: number) => prevTime - 1);
    }, 1000);

    // Cleanup function: clears the interval when the component unmounts
    // or when timeLeft changes to prevent memory leaks
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]); // Re-run effect when timeLeft or onTimeUp changes

  return (
    <View style={styles.container}> 
      {/* Timer display container */}
      <Text style={styles.timerText}>{timeLeft} seconds left</Text>
    </View>
  );
};

// Styles for the timer component
const styles = StyleSheet.create({
  container: {
    padding: 10, // Adds space inside the container
    alignItems: "center", // Centers items horizontally
    justifyContent: "center", // Centers items vertically
    backgroundColor: "#ffdddd", // Light red background to indicate urgency
    borderRadius: 10, // Rounded corners for a smoother appearance
    width: "50%", // Makes the timer box take up half the screen width
    alignSelf: "center", // Centers the timer box on the screen
    marginTop: 10, // Adds some space above the timer
  },
  timerText: {
    fontSize: 20, // Sets the size of the text
    fontWeight: "bold", // Makes the text bold for emphasis
    color: "#900000", // Dark red color for better readability
  },
});

export default QuizTimer;
