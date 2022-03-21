import React from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { StartButton } from './StartScreen';

export const App = () => (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <StartButton buttonText="START" />
  </SafeAreaView>
);
