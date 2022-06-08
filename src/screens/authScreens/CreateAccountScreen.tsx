import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { StackParams } from '../../navigation';
import { setIsLoadingFalse, setIsLoadingTrue } from '../../store/appSlice';
import { setUser } from '../../store/userSlice';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { COLORS } from '../../constants';

export const CreateAccountScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const dispatch = useDispatch();

  const onRegisterPressed = useCallback(async () => {
    dispatch(setIsLoadingTrue());

    if (password !== passwordRepeat) {
      dispatch(setIsLoadingFalse());
      Alert.alert('Passwords doesnt match!');
      return;
    }

    try {
      const firebaseAuth = await auth();
      const UserCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);

      dispatch(setUser({ email: UserCredential.user.email, id: UserCredential.user.uid }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setIsLoadingFalse());
        Alert.alert(error.message);
      }
    }
  }, [dispatch, email, password, passwordRepeat]);

  const onLogInPressed = useCallback(() => {
    navigation.navigate('LoginScreen');
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

      <CustomInput value={email} setValue={setEmail} placeholder="Email" />
      <View style={styles.spacing} />
      <CustomInput value={password} setValue={setPassword} placeholder="Password" secureTextEntry />
      <CustomInput
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        placeholder="Password repeat"
        secureTextEntry
      />
      <View style={styles.spacing} />

      <CustomButton onPress={onRegisterPressed} text={'Register'} />
      <View style={styles.spacing} />
      <Text style={styles.text}>
        By registering, you confirm that you accept our{' '}
        <Text style={styles.link} onPress={onTermsPressed}>
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={onPolicyPressed}>
          Privacy Policy
        </Text>
        .
      </Text>
      <View style={styles.spacing} />
      <CustomButton onPress={onLogInPressed} text={`Have an account? Log in`} type={'SECONDARY'} />
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
    color: COLORS.light.text,
    marginBottom: 20,
  },
  spacing: {
    height: 10,
  },
  text: {
    width: '75%',
  },
  link: {
    color: COLORS.buttonBackground,
  },
});
