import React, { useCallback, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { COLORS } from '../../constants';
import { StackParams } from '../../navigation';
import { enableLoading, disableLoading } from '../../store/appSlice';
import { CustomButton, CustomInput } from '../../components';
import { ButtonType } from '../../components/CustomButton';
import { CREATE_ACCOUNT_SCREEN, FORGOT_PASSWORD_SCREEN } from '../../navigation/constants';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { height } = useWindowDimensions();

  const onLoginInPressed = useCallback(async () => {
    dispatch(enableLoading());

    try {
      const firebaseAuth = await auth();
      await firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(disableLoading());
        Alert.alert(error.message);
      }
    }
  }, [dispatch, email, password]);

  const onForgotPasswordPressed = useCallback(() => {
    navigation.navigate(FORGOT_PASSWORD_SCREEN);
  }, [navigation]);

  const onCreateAccountPressed = useCallback(() => {
    navigation.navigate(CREATE_ACCOUNT_SCREEN);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/Logo.png')}
        style={[styles.logo, { height: height * 0.25 }]}
        resizeMode={'contain'}
      />
      <CustomInput value={email} onChangeText={setEmail} placeholder="Email" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <CustomButton onPress={onLoginInPressed} text={'Log In'} />
      <CustomButton
        onPress={onForgotPasswordPressed}
        text={'Forgot password?'}
        type={ButtonType.tertiary}
      />
      <CustomButton
        onPress={onCreateAccountPressed}
        text={`New here? Create an account`}
        type={ButtonType.secondary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.teal,
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 300,
    marginBottom: 40,
  },
});
