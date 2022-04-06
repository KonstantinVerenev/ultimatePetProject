import React, { useState } from 'react';
import { Text, SafeAreaView, Switch, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { RootState } from '../../store';
import { toggleTheme } from '../../store/appSlice';
import { CustomButton } from '../../components/CustomButton';
import { COLORS } from '../../constants';

export const HomeScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.user.email);

  const onLogoutPress = async () => {
    const firebaseAuth = await auth();
    await firebaseAuth.signOut();
  };

  const toggleAppTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    dispatch(toggleTheme());
  };

  const textColor = isDarkTheme ? COLORS.dark.text : COLORS.light.text;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkTheme ? COLORS.dark.background : COLORS.light.background,
      }}
    >
      <Text style={{ color: textColor }}>Home Screen</Text>
      <Text style={{ color: textColor }}>Current User: {email}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ color: textColor }}>Dark mode: </Text>
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
