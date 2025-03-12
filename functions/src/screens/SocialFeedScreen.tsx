import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import { collection, getDocs, updateDoc, doc, arrayUnion, increment } from "firebase/firestore";
import { db, auth } from "../services/firebase";

interface Post {
  id: string;
  userId: string;
  content: string;
  reactions: { [key: string]: number };
  comments: { userId: string; text: string }[];
}

const SocialFeedScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

    const handleReact = async (postId: string, emoji: string) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { 
      [`reactions.${emoji}`]: increment(1) // Correctly increases reaction count as a number
    });
  };
  
  const handleComment = async (postId: string) => {
    if (!commentText[postId]) return;
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion({ userId: auth.currentUser?.uid, text: commentText[postId] }),
    });
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>📢 Social Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.content}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {["🔥", "🎉", "👍"].map((emoji) => (
                <TouchableOpacity key={emoji} onPress={() => handleReact(item.id, emoji)} style={{ marginRight: 10 }}>
                <Text>{emoji} {item.reactions?.[emoji] ?? 0}</Text> 
              </TouchableOpacity>
              
              ))}
            </View>
            <TextInput
              placeholder="Add a comment..."
              value={commentText[item.id] || ""}
              onChangeText={(text) => setCommentText((prev) => ({ ...prev, [item.id]: text }))}
              style={{ borderWidth: 1, marginTop: 5, padding: 5, borderRadius: 5 }}
            />
            <TouchableOpacity onPress={() => handleComment(item.id)} style={{ marginTop: 5 }}>
              <Text>💬 Post Comment</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SocialFeedScreen;
