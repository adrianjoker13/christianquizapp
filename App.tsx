import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Display the splash screen for 3 seconds
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isSplashVisible ? <SplashScreen /> : <AppNavigator />}
    </GestureHandlerRootView>
  );
}
