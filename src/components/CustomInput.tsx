import React, { SetStateAction } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/colors';

type CustomInputProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  placeholder: string;
  secureTextEntry?: boolean;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '80%',
    maxWidth: 400,
    //padding: 15,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    paddingVertical: Platform.OS === 'android' ? 10 : 15,
    paddingHorizontal: 15,
  },
});
