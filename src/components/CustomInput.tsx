import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';

import { COLORS, THEME_COLORS } from '../constants';

type CustomInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
};

const isAndroid = Platform.OS === 'android';

export const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '80%',
    maxWidth: 400,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.accent,
    backgroundColor: THEME_COLORS.light.background,
  },
  input: {
    paddingVertical: isAndroid ? 10 : 15,
    paddingHorizontal: 15,
  },
});
