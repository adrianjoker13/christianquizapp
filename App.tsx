import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";
import { updateFCMToken } from "./functions/src/services/firebase"; // Ensure correct import
import { auth, db } from "./functions/src/services/firebase";



const App = () => {
  useEffect(() => {
    // Function to request notification permission from the user
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log("Notification permission granted.");
        registerFCMToken();
      } else {
        console.log("Notification permission denied.");
      }
    };

    // Function to get and store the user's FCM token
    const registerFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        
        // Replace "USER_ID_HERE" with the actual logged-in user ID
        const userId = "USER_ID_HERE"; 
        if (userId) {
          await updateFCMToken(userId);
        }
      } catch (error) {
        console.error("Error fetching FCM token:", error);
      }
    };

    // Handle notification when the app is open
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log("Received in foreground:", remoteMessage);
      Alert.alert(remoteMessage.notification?.title ?? "Notification", remoteMessage.notification?.body ?? "");
    });

    // Handle notification when the app is opened from a notification
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification opened:", remoteMessage);
    });

    // Handle notification when the app is launched from a notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("App launched from notification:", remoteMessage);
        }
      });

    // Request permission on app start
    requestPermission();

    // Cleanup listeners when component unmounts
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);

  return (
    <View>
      <Text>Christian Quiz App</Text>
    </View>
  );
};

export default App;
