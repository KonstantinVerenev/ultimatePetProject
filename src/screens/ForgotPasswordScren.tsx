import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { CustomButton } from '../components/CustomButton';

import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../constants/colors';

export const ForgotPasswordScreen = () => {
  const [userName, setUserName] = useState<string>('');

  const onSendPressed = () => {
    console.warn('Send Pressed');
  };

  const onBackOnLogInPressed = () => {
    console.warn('Back to Log In');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput value={userName} setValue={setUserName} placeholder="Enter your username" />
      <CustomButton onPress={onSendPressed} text={'Send'} />

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
