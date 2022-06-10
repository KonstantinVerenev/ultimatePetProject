import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { COLORS } from '../constants';
import { OnboadringScreen } from '../screens/introScreens/OnboadringScreen';
import { StartScreen } from '../screens/introScreens/StartScreen';
import { LoginScreen } from '../screens/authScreens/LoginScreen';
import { CreateAccountScreen } from '../screens/authScreens/CreateAccountScreen';
import { ForgotPasswordScreen } from '../screens/authScreens/ForgotPasswordScren';
import { HomeScreen } from '../screens/appScreens/HomeScreen';

import { selectIsLoggedIn } from '../store/selectors';
import {
  CREATE_ACCOUNT_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  ONBOARDING_SCREEN,
  START_SCREEN,
} from './constants';
import { useAuthSubscription } from '../hooks/useAuthSubscription';

export type StackParams = {
  OnboardingScreen: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  CreateAccountScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useAuthSubscription();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.teal },
          headerShadowVisible: true,
        }}
      >
        <Stack.Group screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name={ONBOARDING_SCREEN} component={OnboadringScreen} />
              <Stack.Screen name={START_SCREEN} component={StartScreen} />
              <Stack.Screen
                name={LOGIN_SCREEN}
                component={LoginScreen}
                options={{ animation: 'fade' }}
              />
              <Stack.Screen name={CREATE_ACCOUNT_SCREEN} component={CreateAccountScreen} />
              <Stack.Screen name={FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
            </>
          )}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
