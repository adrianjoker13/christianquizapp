import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Cloud Function to update leaderboard daily
exports.updateLeaderboard = functions.pubsub.schedule("every 24 hours").onRun(async (context: functions.EventContext) => {
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
