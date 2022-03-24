import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { CustomButton } from '../components/CustomButton';

import { CustomInput } from '../components/CustomInput';

export const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLoginInPressed = () => {
    console.warn('Log In');
  };

  const onForgotPasswordPressed = () => {
    console.warn('Forgot password?');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/Logo.png')}
        style={[styles.logo, { height: height * 0.25 }]}
        resizeMode={'contain'}
      />
      <CustomInput value={username} setValue={setUsername} placeholder="Username" />
      <CustomInput value={password} setValue={setPassword} placeholder="Password" secureTextEntry />

      <CustomButton onPress={onLoginInPressed} text={'Log In'} />
      <CustomButton onPress={onForgotPasswordPressed} text={'Forgot password?'} type={'TERTIARY'} />
      <CustomButton
        onPress={onForgotPasswordPressed}
        text={`New here? Create an account`}
        type={'SECONDARY'}
      />
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
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 300,
    marginBottom: 40,
  },
});
