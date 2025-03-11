import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import MultipleChoiceQuiz from './screens/MultipleChoiceQuiz';
import FillInTheBlankQuiz from './screens/FillInTheBlankQuiz';
import BibleTimelineQuiz from './screens/BibleTimelineQuiz';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MultipleChoiceQuiz" component={MultipleChoiceQuiz} />
        <Stack.Screen name="FillInTheBlankQuiz" component={FillInTheBlankQuiz} />
        <Stack.Screen name="BibleTimelineQuiz" component={BibleTimelineQuiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
