import React, { useState, useCallback } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnimatePresence, MotiView } from 'moti';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParams } from '../../navigation';
import { COLORS, THEME_COLORS } from '../../constants';
import { LOGIN_SCREEN, ONBOARDING_SCREEN } from '../../navigation/constants';

const PulseButton: React.FC<{ buttonText: string; onPress: () => void }> = ({
  buttonText,
  onPress,
}) => {
  const [visible, setVisible] = useState(true);

  const onPressButton = useCallback(() => {
    setVisible(!visible);
    onPress();
  }, [onPress, visible]);

  return (
    <Pressable style={styles.pulseButton} onPress={onPressButton}>
      <AnimatePresence>
        {[...Array(3).keys()].map((index: number) => {
          return (
            visible && (
              <MotiView
                from={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 3 }}
                transition={{
                  type: 'timing',
                  duration: 2100,
                  loop: true,
                  repeatReverse: false,
                  delay: index * 700,
                }}
                exitTransition={{
                  type: 'timing',
                  duration: 500,
                  loop: false,
                  repeatReverse: false,
                  delay: 0,
                }}
                exit={{ opacity: 1, scale: 50 }}
                key={index}
                style={styles.pulseButtonAnimation}
              />
            )
          );
        })}
      </AnimatePresence>
      <Text style={styles.pulseButtonText}>{buttonText}</Text>
    </Pressable>
  );
};

export const StartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  const onStartPressed = useCallback(() => navigation.navigate(LOGIN_SCREEN), [navigation]);

  const onBackPressed = useCallback(() => navigation.navigate(ONBOARDING_SCREEN), [navigation]);

  return (
    <View style={styles.container}>
      <PulseButton buttonText="START" onPress={onStartPressed} />
      <TouchableOpacity style={styles.backButton} onPress={onBackPressed}>
        <Text style={styles.backButtonText}>&#8678; Back to info</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.dark.background,
  },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 50,
    borderColor: COLORS.teal,
  },
  pulseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.teal,
  },
  pulseButtonAnimation: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.teal,
  },
  pulseButtonText: {
    fontWeight: '700',
    color: THEME_COLORS.dark.text,
  },
  backButton: {
    zIndex: 0,
    marginTop: 150,
    padding: 20,
    borderRadius: 30,
    shadowColor: THEME_COLORS.dark.background,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    backgroundColor: COLORS.teal,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME_COLORS.dark.text,
  },
});
