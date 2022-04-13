import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { COLORS } from '../constants';

type CustomButtonType = {
  onPress: () => void;
  text: string;
  type?: 'PRIMARY' | 'TERTIARY' | 'SECONDARY';
};

export const CustomButton: React.FC<CustomButtonType> = ({ onPress, text, type = 'PRIMARY' }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`] as ViewStyle]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    maxWidth: 400,
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  container_PRIMARY: {
    backgroundColor: COLORS.buttonBackground,
  },
  container_TERTIARY: {
    backgroundColor: 'transparent',
  },
  container_SECONDARY: {
    borderColor: COLORS.buttonBackground,
    borderWidth: 1,
  },
  text: {
    fontWeight: '700',
    color: 'black',
  },
});
