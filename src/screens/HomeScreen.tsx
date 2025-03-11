import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('MenuScreen')}
      >
        <Text style={styles.buttonText}>Go to Quiz Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  welcomeText: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  startButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
