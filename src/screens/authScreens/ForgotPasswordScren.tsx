import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { COLORS } from '../../constants';
import { StackParams } from '../../navigation';
import { setIsLoadingFalse, setIsLoadingTrue } from '../../store/appSlice';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();

  const onSendPressed = useCallback(async () => {
    dispatch(setIsLoadingTrue());

    const firebaseAuth = await auth();
    try {
      await firebaseAuth.sendPasswordResetEmail(email);
      dispatch(setIsLoadingFalse());
      Alert.alert('Check your email to reset your password');
      navigation.navigate('LoginScreen');
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setIsLoadingFalse());
        Alert.alert(error.message);
      }
    }
  }, [dispatch, email, navigation]);

  const onBackOnLogInPressed = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput value={email} setValue={setEmail} placeholder="Enter your email" />
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
    color: COLORS.light.text,
    marginBottom: 20,
  },
  text: {
    width: '75%',
  },
});
