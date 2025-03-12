import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from "react-native";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Comment {
  userId: string;
  text: string;
}

interface PostData {
  userName: string;
  achievement: string;
  timestamp: string;
  comments?: Comment[];
  reactions?: { [key: string]: string };
}

interface SocialFeedCardProps {
  postId: string;
  userId: string;
}

const SocialFeedCard: React.FC<SocialFeedCardProps> = ({ postId, userId }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, "social_feed", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const data = postSnap.data() as PostData;
        setPost(data);
        setComments(data.comments || []);
        setReaction(data.reactions?.[userId] || null);
      }
    };

    fetchPost();
  }, [postId, userId]);

  const handleReaction = async (emoji: string) => {
    if (!userId || !postId) return;

    const postRef = doc(db, "social_feed", postId);
    await updateDoc(postRef, {
      [`reactions.${userId}`]: emoji,
    });
    setReaction(emoji);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !userId || !postId) return;
    const newComment: Comment = { userId, text: comment };
    const postRef = doc(db, "social_feed", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(newComment),
    });
    setComments([...comments, newComment]);
    setComment("");
  };

  const handleDeleteComment = async (commentToDelete: Comment) => {
    const postRef = doc(db, "social_feed", postId);
    await updateDoc(postRef, {
      comments: arrayRemove(commentToDelete),
    });
    setComments(comments.filter((c) => c !== commentToDelete));
  };

  if (!post) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{post.userName}</Text>
      <Text style={styles.achievement}>{post.achievement}</Text>
      <Text style={styles.timestamp}>{post.timestamp}</Text>
      
      {/* Reactions */}
      <View style={styles.reactionsContainer}>
        {["🔥", "👏", "💪", "🎯"].map((emoji) => (
          <TouchableOpacity key={emoji} onPress={() => handleReaction(emoji)}>
            <Text style={[styles.reaction, reaction === emoji && styles.selectedReaction]}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comments */}
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.text}</Text>
            {item.userId === userId && (
              <TouchableOpacity onPress={() => handleDeleteComment(item)}>
                <Text style={styles.deleteComment}>🗑️</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Add Comment */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          value={comment}
          onChangeText={setComment}
          placeholder="Write a comment..."
        />
        <TouchableOpacity onPress={handleCommentSubmit}>
          <Text style={styles.submitComment}>📩</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SocialFeedCard;
