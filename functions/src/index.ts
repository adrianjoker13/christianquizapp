import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Cloud Function to update leaderboard daily
exports.updateLeaderboard = functions.pubsub.onSchedule("every 24 hours", async () => {
  try {
    const usersRef = db.collection("users");
    const leaderboardRef = db.collection("leaderboard");

    // Fetch top 10 users based on XP
    const snapshot = await usersRef.orderBy("xp", "desc").limit(10).get();

    // Clear existing leaderboard
    const leaderboardDocs = await leaderboardRef.get();
    leaderboardDocs.forEach((doc) => doc.ref.delete());

    // Write new leaderboard data
    const batch = db.batch();
    snapshot.forEach((doc) => {
      batch.set(leaderboardRef.doc(doc.id), doc.data());
    });

    await batch.commit();
    console.log("Leaderboard updated successfully!");
    return null;
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    throw new functions.https.HttpsError("internal", "Leaderboard update failed.");
  }
});

// Cloud Function to send daily push notifications
exports.sendDailyReminder = functions.pubsub.onSchedule("every 24 hours", async () => {
  try {
    const usersRef = db.collection("users");
    const usersSnapshot = await usersRef.get();

    const messages: any[] = [];

    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      if (userData.fcmToken) {
        messages.push({
          token: userData.fcmToken,
          notification: {
            title: "🔥 Keep Your Streak Alive!",
            body: "Don't forget to complete your quiz today!",
          },
        });
      }
    });

    if (messages.length > 0) {
      await admin.messaging().sendEach(messages);
      console.log("Daily notifications sent successfully!");
    } else {
      console.log("No users with FCM tokens found.");
    }

    return null;
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
});