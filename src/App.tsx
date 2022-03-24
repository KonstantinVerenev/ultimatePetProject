import React from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboadringScreen } from './screens/OnboadringScreen';
import { StartScreen } from './screens/StartScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { ConfirmEmailScreen } from './screens/ConfirmEmailScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScren';
import { NewPasswordScreen } from './screens/NewPasswordScreen';

export type StackParams = {
  OnboadringScreen: undefined;
  LoginScreen: undefined;
  MainScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboadringScreen" component={OnboadringScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
