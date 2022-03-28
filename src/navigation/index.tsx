import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboadringScreen } from '../screens/OnboadringScreen';
import { StartScreen } from '../screens/StartScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScren';
import { HomeScreen } from '../screens/HomeScreen';

export type StackParams = {
  OnboadringScreen: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  CreateAccountScreen: undefined;
  ConfirmEmailScreen: undefined;
  ForgotPasswordScreen: undefined;
  NewPasswordScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/*<Stack.Screen name="OnboadringScreen" component={OnboadringScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />*/}
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
