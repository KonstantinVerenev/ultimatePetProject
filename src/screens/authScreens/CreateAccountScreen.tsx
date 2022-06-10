import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { COLORS, THEME_COLORS } from '../../constants';
import { StackParams } from '../../navigation';
import { enableLoading, disableLoading } from '../../store/appSlice';
import { setUser } from '../../store/userSlice';
import { CustomButton, CustomInput } from '../../components';
import { ButtonType } from '../../components/CustomButton';
import { LOGIN_SCREEN } from '../../navigation/constants';

export const CreateAccountScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onRegisterPressed = useCallback(async () => {
    dispatch(enableLoading());

    if (password !== passwordRepeat) {
      dispatch(disableLoading());
      Alert.alert('Passwords doesnt match!');
      return;
    }

    try {
      const firebaseAuth = await auth();
      const UserCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);

      dispatch(setUser({ email: UserCredential.user.email, id: UserCredential.user.uid }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(disableLoading());
        Alert.alert(error.message);
      }
    }
  }, [dispatch, email, password, passwordRepeat]);

  const onLogInPressed = useCallback(() => {
    navigation.navigate(LOGIN_SCREEN);
  }, [navigation]);

  const onTermsPressed = () => {
    console.warn('Terms of Use');
  };

  const onPolicyPressed = () => {
    console.warn('Privacy Policy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account </Text>
      <CustomInput value={email} onChangeText={setEmail} placeholder="Email" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <CustomInput
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        placeholder="Password repeat"
        secureTextEntry
      />
      <CustomButton onPress={onRegisterPressed} text={'Register'} />
      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsPressed}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={onPolicyPressed}>
          Privacy Policy
        </Text>
      </Text>
      <CustomButton
        onPress={onLogInPressed}
        text={`Have an account? Log in`}
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
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '700',
    color: THEME_COLORS.light.text,
  },
  text: {
    width: '75%',
  },
  link: {
    color: COLORS.buttonBackground,
  },
});
