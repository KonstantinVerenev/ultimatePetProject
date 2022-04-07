import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { COLORS } from '../../constants';
import { TopBar } from '../../components/TopBar';
import { Image } from 'moti';

export const HomeScreen = () => {
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

  return (
    <SafeAreaView
      style={[
        {
          ...styles.container,
          backgroundColor: darkTheme ? COLORS.dark.background : COLORS.light.background,
        },
      ]}
    >
      <TopBar />

      <Image
        source={require('../../../assets/DottedBG.png')}
        style={{
          alignSelf: 'flex-end',
          width: '60%',
          height: '95%',
          position: 'absolute',
          bottom: 0,
          zIndex: -1,
          resizeMode: 'contain',
          opacity: 0.5,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
