"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
const Leaderboard = () => {
    const [users, setUsers] = (0, react_1.useState)([]); // State to store leaderboard data
    const [filter, setFilter] = (0, react_1.useState)("allTime"); // "allTime" or "weekly"
    const [searchQuery, setSearchQuery] = (0, react_1.useState)(""); // Search query state
    const [userId, setUserId] = (0, react_1.useState)(null); // Store logged-in user ID
    const db = (0, firestore_1.getFirestore)();
    const auth = (0, auth_1.getAuth)();
    (0, react_1.useEffect)(() => {
        // Get the logged-in user's ID
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        // Fetch leaderboard data from Firestore
        const fetchLeaderboard = () => __awaiter(void 0, void 0, void 0, function* () {
            let leaderboardQuery;
            if (filter === "weekly") {
                // Get users ordered by XP earned in the last 7 days
                leaderboardQuery = (0, firestore_1.query)((0, firestore_1.collection)(db, "users"), (0, firestore_1.where)("optInLeaderboard", "==", true), (0, firestore_1.orderBy)("weeklyXP", "desc"));
            }
            else {
                // Get users ordered by all-time XP
                leaderboardQuery = (0, firestore_1.query)((0, firestore_1.collection)(db, "users"), (0, firestore_1.where)("optInLeaderboard", "==", true), (0, firestore_1.orderBy)("totalXP", "desc"));
            }
            const querySnapshot = yield (0, firestore_1.getDocs)(leaderboardQuery);
            const leaderboardData = querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            setUsers(leaderboardData);
        });
        fetchLeaderboard();
    }, [filter]);
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Leaderboard</react_native_1.Text>

      {/* Filter buttons for Weekly or All-Time XP */}
      <react_native_1.View style={styles.filterContainer}>
        <react_native_1.TouchableOpacity onPress={() => setFilter("weekly")} style={[styles.filterButton, filter === "weekly" && styles.activeFilter]}>
          <react_native_1.Text>Weekly</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={() => setFilter("allTime")} style={[styles.filterButton, filter === "allTime" && styles.activeFilter]}>
          <react_native_1.Text>All Time</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {/* Search bar */}
      <react_native_1.TextInput style={styles.searchBar} placeholder="Search for a user..." value={searchQuery} onChangeText={setSearchQuery}/>

      {/* Leaderboard list */}
      <react_native_1.FlatList data={users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))} keyExtractor={(item) => item.id} renderItem={({ item, index }) => (<react_native_1.View style={[styles.userContainer, userId === item.id && styles.highlightUser]}> {/* Highlight the logged-in user */}
            <react_native_1.Text style={styles.rank}>{index + 1}</react_native_1.Text>
            <react_native_1.Text style={styles.userName}>{item.name}</react_native_1.Text>
            <react_native_1.Text style={styles.userXP}>{filter === "weekly" ? item.weeklyXP : item.totalXP} XP</react_native_1.Text>
            {/* Show achievement badge if user reaches a milestone */}
            {index < 3 && <react_native_1.Text style={styles.badge}>{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</react_native_1.Text>}
          </react_native_1.View>)}/>

      {/* Celebrate Button (For Future Implementation) */}
      {/* <TouchableOpacity onPress={() => celebrate(userId)}>
          <Text style={styles.celebrateButton}>🎉 Celebrate a Friend</Text>
        </TouchableOpacity> */}

      {/* Monthly Opt-In Reminder (For Future Implementation) */}
      {/* setTimeout(() => {
          if (!user.optInLeaderboard) {
            alert("Would you like to join the leaderboard?");
          }
        }, 30 * 24 * 60 * 60 * 1000); // Every 30 days */}
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    filterButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    activeFilter: {
        backgroundColor: "#4CAF50",
        color: "white",
    },
    searchBar: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    userContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
        marginBottom: 5,
        borderRadius: 5,
    },
    highlightUser: {
        backgroundColor: "#FFFF99", // Highlight logged-in user
    },
    rank: {
        fontWeight: "bold",
    },
    userName: {
        flex: 1,
    },
    userXP: {
        fontWeight: "bold",
    },
    badge: {
        fontSize: 18,
    },
    celebrateButton: {
        textAlign: "center",
        padding: 10,
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: 5,
        marginTop: 10,
    },
});
exports.default = Leaderboard;
