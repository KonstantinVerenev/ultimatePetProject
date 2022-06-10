import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const BackgroundImage: React.FC = () => (
  <Image source={require('../../assets/DottedBG.png')} style={styles.BackgroundImage} />
);

const styles = StyleSheet.create({
  BackgroundImage: {
    alignSelf: 'flex-end',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '60%',
    height: '95%',
    resizeMode: 'contain',
    opacity: 0.5,
  },
});
