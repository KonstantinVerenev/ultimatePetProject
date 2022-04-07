import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { COLORS } from '../constants';
import { RootState } from '../store';
import { toggleTheme } from '../store/appSlice';

export const TopBar = () => {
  const isDarkTheme = useSelector((state: RootState) => state.app.darkTheme);
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.user.email);

  const onLogoutPress = async () => {
    const firebaseAuth = await auth();
    await firebaseAuth.signOut();
  };

  const toggleAppTheme = () => {
    dispatch(toggleTheme());
  };

  const textColor = isDarkTheme ? COLORS.dark.text : COLORS.light.text;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: textColor }}>Dark mode: </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkTheme ? 'teal' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            value={isDarkTheme}
            onValueChange={toggleAppTheme}
          />
        </View>

        <View>
          <Text
            style={{
              color: textColor,
              padding: 5,
              alignSelf: 'center',
            }}
          >
            Current User:
          </Text>
          <Text
            style={{
              color: textColor,
              padding: 5,
              alignSelf: 'center',
            }}
          >
            {email}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 100,
    backgroundColor: COLORS.dark.buttonBackground,
    borderRadius: 5,
  },
  darkButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.dark.text,
  },
  buttonText: {
    fontWeight: '700',
  },
});
