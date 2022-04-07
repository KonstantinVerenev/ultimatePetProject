import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { OnboadringScreen } from '../screens/introScreens/OnboadringScreen';
import { StartScreen } from '../screens/introScreens/StartScreen';
import { LoginScreen } from '../screens/authScreens/LoginScreen';
import { CreateAccountScreen } from '../screens/authScreens/CreateAccountScreen';
import { ForgotPasswordScreen } from '../screens/authScreens/ForgotPasswordScren';
import { HomeScreen } from '../screens/appScreens/HomeScreen';
import { removeUser, setUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setIsLoadingFalse } from '../store/appSlice';
import { COLORS } from '../constants';

export type StackParams = {
  OnboadringScreen: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  CreateAccountScreen: undefined;
  ForgotPasswordScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  //const darkTheme = useSelector((state: RootState) => state.app.darkTheme);
  //const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const isLoggedIn = true;
  const dispatch = useDispatch();

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email, id: user.uid }));
      }
      if (user === null) {
        dispatch(removeUser());
      }
      dispatch(setIsLoadingFalse());
    });

    return authSubscriber;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'teal' },
          headerShadowVisible: true,
        }}
      >
        {isLoggedIn ? (
          // Screens for logged in
          <Stack.Group
            screenOptions={{ headerShown: false }}
            //screenOptions={{
            //  headerStyle: {
            //    backgroundColor: darkTheme ? COLORS.dark.background : COLORS.light.background,
            //  },
            //  headerTitleStyle: {
            //    color: darkTheme ? COLORS.dark.text : COLORS.light.text,
            //  },
            //}}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Group>
        ) : (
          // Authentication & Intro screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnboadringScreen" component={OnboadringScreen} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ animation: 'fade' }}
            />
            <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
