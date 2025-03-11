import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* ✅ Correct relative path to the logo */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Change this to match your branding
  },
  logo: {
    width: 200, // Adjust the size based on your logo
    height: 200,
    resizeMode: 'contain',
  },
});
