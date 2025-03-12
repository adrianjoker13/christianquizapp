"use strict";
/*
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from './firebaseConfig'; // Ensure Firebase is initialized

const db = getFirestore(app);
const storage = getStorage(app);

const AudioQuiz = ({ questionId }) => {
    const [question, setQuestion] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const docRef = doc(db, "quizzes", questionId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setQuestion(data);
                    
                    // Fetch audio file URL
                    const storageRef = ref(storage, data.audio_url);
                    const url = await getDownloadURL(storageRef);
                    setAudioUrl(url);
                }
            } catch (error) {
                console.error("Error fetching question:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [questionId]);

    const playAudio = async () => {
        if (!audioUrl) return;
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return sound ? () => sound.unloadAsync() : undefined;
    }, [sound]);

    const handleAnswer = async (option) => {
        setSelectedOption(option);
        const isCorrect = option === question.correct_option;
        setFeedback(isCorrect ? "Correct! 🎉" : "Wrong! ❌");
        
        // Update spaced repetition data
        const updatedData = {
            last_attempt: new Date().toISOString(),
            repetition_count: (question.spaced_repetition_data.repetition_count || 0) + 1,
            easiness_factor: isCorrect ? question.spaced_repetition_data.easiness_factor + 0.1 : question.spaced_repetition_data.easiness_factor - 0.2,
            next_review: new Date(Date.now() + (isCorrect ? 7 : 2) * 24 * 60 * 60 * 1000).toISOString()
        };
        
        await updateDoc(doc(db, "quizzes", questionId), {
            spaced_repetition_data: updatedData
        });
    };

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (!question) return <Text>Error loading question.</Text>;

    return (
        <View>
            <TouchableOpacity onPress={playAudio} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>▶ Play Audio</Text>
            </TouchableOpacity>
            <Text>Select the correct answer:</Text>
            {Object.entries(question.options).map(([key, option]) => (
                <TouchableOpacity
                    key={key}
                    onPress={() => handleAnswer(key)}
                    style={{ padding: 10, margin: 5, backgroundColor: selectedOption === key ? 'gray' : 'lightblue' }}
                >
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
            {feedback && <Text>{feedback}</Text>}
        </View>
    );
};

export default AudioQuiz;
*/ 
