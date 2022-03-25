import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { CustomButton } from '../components/CustomButton';

import { CustomInput } from '../components/CustomInput';
import { StackParams } from '../navigation';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLoginInPressed = () => {
    navigation.navigate('HomeScreen');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const onCreateAccountPressed = () => {
    navigation.navigate('CreateAccountScreen');
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
      {/*<CustomButton onPress={onForgotPasswordPressed} text={'Forgot password?'} type={'TERTIARY'} />*/}
      <CustomButton
        onPress={onCreateAccountPressed}
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
