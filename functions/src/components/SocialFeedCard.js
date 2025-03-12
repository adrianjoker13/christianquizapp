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
const SocialFeedCard = ({ postId, userId }) => {
    const [post, setPost] = (0, react_1.useState)(null);
    const [reaction, setReaction] = (0, react_1.useState)(null);
    const [comment, setComment] = (0, react_1.useState)("");
    const [comments, setComments] = (0, react_1.useState)([]);
    const db = (0, firestore_1.getFirestore)();
    const auth = (0, auth_1.getAuth)();
    (0, react_1.useEffect)(() => {
        const fetchPost = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const postRef = (0, firestore_1.doc)(db, "social_feed", postId);
            const postSnap = yield (0, firestore_1.getDoc)(postRef);
            if (postSnap.exists()) {
                const data = postSnap.data();
                setPost(data);
                setComments(data.comments || []);
                setReaction(((_a = data.reactions) === null || _a === void 0 ? void 0 : _a[userId]) || null);
            }
        });
        fetchPost();
    }, [postId, userId]);
    const handleReaction = (emoji) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userId || !postId)
            return;
        const postRef = (0, firestore_1.doc)(db, "social_feed", postId);
        yield (0, firestore_1.updateDoc)(postRef, {
            [`reactions.${userId}`]: emoji,
        });
        setReaction(emoji);
    });
    const handleCommentSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!comment.trim() || !userId || !postId)
            return;
        const newComment = { userId, text: comment };
        const postRef = (0, firestore_1.doc)(db, "social_feed", postId);
        yield (0, firestore_1.updateDoc)(postRef, {
            comments: (0, firestore_1.arrayUnion)(newComment),
        });
        setComments([...comments, newComment]);
        setComment("");
    });
    const handleDeleteComment = (commentToDelete) => __awaiter(void 0, void 0, void 0, function* () {
        const postRef = (0, firestore_1.doc)(db, "social_feed", postId);
        yield (0, firestore_1.updateDoc)(postRef, {
            comments: (0, firestore_1.arrayRemove)(commentToDelete),
        });
        setComments(comments.filter((c) => c !== commentToDelete));
    });
    if (!post)
        return null;
    return (<react_native_1.View style={styles.card}>
      <react_native_1.Text style={styles.userName}>{post.userName}</react_native_1.Text>
      <react_native_1.Text style={styles.achievement}>{post.achievement}</react_native_1.Text>
      <react_native_1.Text style={styles.timestamp}>{post.timestamp}</react_native_1.Text>
      
      {/* Reactions */}
      <react_native_1.View style={styles.reactionsContainer}>
        {["🔥", "👏", "💪", "🎯"].map((emoji) => (<react_native_1.TouchableOpacity key={emoji} onPress={() => handleReaction(emoji)}>
            <react_native_1.Text style={[styles.reaction, reaction === emoji && styles.selectedReaction]}>{emoji}</react_native_1.Text>
          </react_native_1.TouchableOpacity>))}
      </react_native_1.View>

      {/* Comments */}
      <react_native_1.FlatList data={comments} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (<react_native_1.View style={styles.commentContainer}>
            <react_native_1.Text style={styles.commentText}>{item.text}</react_native_1.Text>
            {item.userId === userId && (<react_native_1.TouchableOpacity onPress={() => handleDeleteComment(item)}>
                <react_native_1.Text style={styles.deleteComment}>🗑️</react_native_1.Text>
              </react_native_1.TouchableOpacity>)}
          </react_native_1.View>)}/>

      {/* Add Comment */}
      <react_native_1.View style={styles.commentInputContainer}>
        <react_native_1.TextInput style={styles.commentInput} value={comment} onChangeText={setComment} placeholder="Write a comment..."/>
        <react_native_1.TouchableOpacity onPress={handleCommentSubmit}>
          <react_native_1.Text style={styles.submitComment}>📩</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    card: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userName: {
        fontWeight: "bold",
    },
    achievement: {
        fontSize: 16,
        marginVertical: 5,
    },
    timestamp: {
        fontSize: 12,
        color: "gray",
    },
    reactionsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    reaction: {
        fontSize: 18,
        marginRight: 10,
    },
    selectedReaction: {
        fontWeight: "bold",
    },
    commentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 5,
    },
    commentText: {
        fontSize: 14,
    },
    deleteComment: {
        fontSize: 14,
        color: "red",
        marginLeft: 10,
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        borderBottomWidth: 1,
        padding: 5,
    },
    submitComment: {
        fontSize: 18,
        marginLeft: 10,
    },
});
exports.default = SocialFeedCard;
