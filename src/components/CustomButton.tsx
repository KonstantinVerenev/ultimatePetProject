import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { COLORS, THEME_COLORS } from '../constants';

type CustomButtonType = {
  onPress: () => void;
  text: string;
  type?: ButtonType;
};

export enum ButtonType {
  primary = 'container_primary',
  tertiary = 'container_tertiary',
  secondary = 'container_secondary',
}

export const CustomButton: React.FC<CustomButtonType> = ({
  onPress,
  text,
  type = ButtonType.primary,
}) => (
  <Pressable onPress={onPress} style={[styles.container, styles[type]]}>
    <Text style={styles.text}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
  },
  container_primary: {
    backgroundColor: COLORS.buttonBackground,
  },
  container_tertiary: {
    backgroundColor: COLORS.transparent,
  },
  container_secondary: {
    borderWidth: 1,
    borderColor: COLORS.buttonBackground,
  },
  text: {
    fontWeight: '700',
    color: THEME_COLORS.light.text,
  },
});
