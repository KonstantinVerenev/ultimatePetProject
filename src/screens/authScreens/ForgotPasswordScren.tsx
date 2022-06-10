import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import { COLORS, THEME_COLORS } from '../../constants';
import { StackParams } from '../../navigation';
import { enableLoading, disableLoading } from '../../store/appSlice';
import { CustomButton, CustomInput } from '../../components';
import { ButtonType } from '../../components/CustomButton';
import { LOGIN_SCREEN } from '../../navigation/constants';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onSendPressed = useCallback(async () => {
    dispatch(enableLoading());

    try {
      const firebaseAuth = await auth();
      await firebaseAuth.sendPasswordResetEmail(email);

      dispatch(disableLoading());
      Alert.alert('Check your email to reset your password');

      navigation.navigate(LOGIN_SCREEN);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(disableLoading());
        Alert.alert(error.message);
      }
    }
  }, [dispatch, email, navigation]);

  const onBackOnLogInPressed = useCallback(() => {
    navigation.navigate(LOGIN_SCREEN);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>
      <CustomInput value={email} onChangeText={setEmail} placeholder={'Enter your email'} />
      <CustomButton onPress={onSendPressed} text={'Send'} />
      <CustomButton
        onPress={onBackOnLogInPressed}
        text={`Back to Log In`}
        type={ButtonType.tertiary}
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
});
