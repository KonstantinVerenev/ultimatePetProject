import React from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboadringScreen } from './OnboadringScreen';
import { StartScreen } from './StartScreen';
import { MainScreen } from './MainScreen';

export type StackParams = {
  OnboadringScreen: undefined;
  StartScreen: undefined;
  MainScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboadringScreen" component={OnboadringScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ animation: 'fade' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
