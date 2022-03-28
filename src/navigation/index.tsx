import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboadringScreen } from '../screens/OnboadringScreen';
import { StartScreen } from '../screens/StartScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { ConfirmEmailScreen } from '../screens/ConfirmEmailScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScren';
import { NewPasswordScreen } from '../screens/NewPasswordScreen';
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
        {/*<Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />*/}
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
