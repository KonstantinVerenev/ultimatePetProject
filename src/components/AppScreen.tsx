import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';

import { BackgroundImage } from './BackgroundImage';

type AppScreenProps = {
  children: React.ReactNode;
};

export const AppScreen: React.FC<AppScreenProps> = ({ children }) => {
  const darkTheme = useDarkTheme();

  return (
    <SafeAreaView
      style={[
        {
          ...styles.container,
          backgroundColor: darkTheme ? COLORS.dark.background : COLORS.light.background,
        },
      ]}
    >
      <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />
      {children}
      <BackgroundImage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
});
