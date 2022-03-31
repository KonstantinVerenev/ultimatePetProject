import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { StackParams } from '../../navigation';
import { setIsLoadingFalse, setIsLoadingTrue } from '../../store/appSlice';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const onLoginInPressed = async () => {
    dispatch(setIsLoadingTrue());

    const firebaseAuth = await auth();
    try {
      await firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setIsLoadingFalse());
        Alert.alert(error.message);
      }
    }
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
        source={require('../../../assets/Logo.png')}
        style={[styles.logo, { height: height * 0.25 }]}
        resizeMode={'contain'}
      />
      <CustomInput value={email} setValue={setEmail} placeholder="Email" />
      <CustomInput value={password} setValue={setPassword} placeholder="Password" secureTextEntry />

      <CustomButton onPress={onLoginInPressed} text={'Log In'} />
      <CustomButton onPress={onForgotPasswordPressed} text={'Forgot password?'} type={'TERTIARY'} />
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
