import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

//import { OnboadringScreen } from '../screens/OnboadringScreen';
//import { StartScreen } from '../screens/StartScreen';
import { LoginScreen } from '../screens/authScreens/LoginScreen';
import { CreateAccountScreen } from '../screens/authScreens/CreateAccountScreen';
import { ForgotPasswordScreen } from '../screens/authScreens/ForgotPasswordScren';
import { HomeScreen } from '../screens/appScreens/HomeScreen';
import { setUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

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
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email, id: user.uid }));
      }
    });

    return authSubscriber;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Intro screens */}
        {/*<Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboadringScreen" component={OnboadringScreen} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
        </Stack.Group>*/}

        {isLoggedIn ? (
          // Screens for logged in
          <Stack.Group>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group screenOptions={{ headerShown: false }}>
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
