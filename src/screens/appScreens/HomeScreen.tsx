import React from 'react';
import { Text, SafeAreaView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { RootState } from '../../store';

export const HomeScreen = () => {
  const email = useSelector((state: RootState) => state.user.email);

  const onLogoutPress = async () => {
    const firebaseAuth = await auth();
    await firebaseAuth.signOut();
  };

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Text>Current User: {email}</Text>
      <Button title="Log Out" onPress={onLogoutPress} />
    </SafeAreaView>
  );
};