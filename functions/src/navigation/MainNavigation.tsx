import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import QuizSummaryScreen from "../screens/QuizSummaryScreen";
import AuthScreen from "../screens/AuthScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import { useAppContext } from "../context/AppContext";

const Stack = createStackNavigator();

const MainNavigation = () => {
  const { user } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="QuizSummary" component={QuizSummaryScreen} />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
