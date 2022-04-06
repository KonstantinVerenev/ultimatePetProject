import React, { useState } from 'react';
import { Text, SafeAreaView, Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { useTheme } from '@react-navigation/native';

import { RootState } from '../../store';
import { toggleTheme } from '../../store/appSlice';
import { CustomButton } from '../../components/CustomButton';

export const HomeScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const email = useSelector((state: RootState) => state.user.email);

  const onLogoutPress = async () => {
    const firebaseAuth = await auth();
    await firebaseAuth.signOut();
  };

  const toggleAppTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Home Screen</Text>
      <Text style={{ color: colors.text }}>Current User: {email}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ color: colors.text }}>Dark mode: </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkTheme ? 'teal' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={isDarkTheme}
          onValueChange={toggleAppTheme}
        />
      </View>
      <CustomButton text="Log Out" onPress={onLogoutPress} />
    </SafeAreaView>
  );
};
