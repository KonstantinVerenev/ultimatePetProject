import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { CustomButton } from '../components/CustomButton';

import { CustomInput } from '../components/CustomInput';
import { COLORS } from '../constants';
import { StackParams } from '../navigation';

export const ConfirmEmailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [code, setCode] = useState<string>('');

  const onConfirmPressed = () => {
    navigation.navigate('HomeScreen');
  };

  const onBackOnLogInPressed = () => {
    navigation.navigate('LoginScreen');
  };

  const onResendCodePressed = () => {
    console.warn('Resend Code');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Confirm your Email</Text>
      <CustomInput value={code} setValue={setCode} placeholder="Enter your confirmation code" />
      <CustomButton onPress={onConfirmPressed} text={'Confirm'} />

      <CustomButton onPress={onBackOnLogInPressed} text={`Back to Log In`} type={'TERTIARY'} />
      <CustomButton
        onPress={onResendCodePressed}
        text={`Resend code to email`}
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
