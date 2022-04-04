import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { useTheme } from '@react-navigation/native';

import { RootState } from '../../store';
import { toggleTheme } from '../../store/appSlice';
import { CustomButton } from '../../components/CustomButton';

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const email = useSelector((state: RootState) => state.user.email);
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

  const onLogoutPress = async () => {
    const firebaseAuth = await auth();
    await firebaseAuth.signOut();
  };

  const toggleAppTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Home Screen</Text>
      <Text style={{ color: colors.text }}>Current User: {email}</Text>
      {darkTheme ? (
        <CustomButton text="Change to Ligth Theme" onPress={toggleAppTheme} />
      ) : (
        <CustomButton text="Change to Dark Theme" onPress={toggleAppTheme} />
      )}
      <CustomButton text="Log Out" onPress={onLogoutPress} />
    </SafeAreaView>
  );
};
