import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, THEME_COLORS } from '../constants';
import { toggleTheme } from '../store/appSlice';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { selectEmail } from '../store/selectors';

type TopBarProps = {
  onButtonPress: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({ onButtonPress }) => {
  const isDarkTheme = useDarkTheme();
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);

  const toggleAppTheme = () => {
    dispatch(toggleTheme());
  };

  const textColor = isDarkTheme ? THEME_COLORS.dark.text : THEME_COLORS.light.text;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={{ color: textColor }}>Dark mode: </Text>
        <Switch
          trackColor={{ false: THEME_COLORS.dark.background, true: COLORS.buttonBackground }}
          thumbColor={isDarkTheme ? THEME_COLORS.dark.background : THEME_COLORS.light.background}
          ios_backgroundColor={COLORS.accent}
          value={isDarkTheme}
          onValueChange={toggleAppTheme}
        />
      </View>
      <View>
        <Text style={[styles.email, { color: textColor }]}>
          Current User:{'\n'}
          {email}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  wrapper: {
    alignItems: 'center',
  },
  email: {
    alignSelf: 'center',
    padding: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 100,
    borderRadius: 5,
    backgroundColor: COLORS.buttonBackground,
  },
  buttonText: {
    color: THEME_COLORS.light.text,
    fontWeight: '700',
  },
});
