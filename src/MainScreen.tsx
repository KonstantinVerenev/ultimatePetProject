import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: 'white', fontSize: 26 }}>MAIN SCREEN</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
});
