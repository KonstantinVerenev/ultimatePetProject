import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { CustomButton } from '../components/CustomButton';

import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../constants/colors';

export const NewPasswordScreen = () => {
  const [code, setCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const onSubmitPressed = () => {
    console.warn('Submit Pressed');
  };

  const onBackOnLogInPressed = () => {
    console.warn('Back to Log In');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput value={code} setValue={setCode} placeholder="Code" />
      <CustomInput value={newPassword} setValue={setNewPassword} placeholder="New password" />
      <CustomButton onPress={onSubmitPressed} text={'Submit'} />

      <CustomButton onPress={onBackOnLogInPressed} text={`Back to Log In`} type={'TERTIARY'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 20,
  },
  text: {
    width: '75%',
  },
});
