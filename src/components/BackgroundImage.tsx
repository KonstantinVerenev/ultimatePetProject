import { Image, StyleSheet } from 'react-native';
import React from 'react';

export const BackgroundImage: React.FC = () => {
  return <Image source={require('../../assets/DottedBG.png')} style={styles.BackgroundImage} />;
};

const styles = StyleSheet.create({
  BackgroundImage: {
    alignSelf: 'flex-end',
    width: '60%',
    height: '95%',
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    resizeMode: 'contain',
    opacity: 0.5,
  },
});
