import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnimatePresence, MotiView } from 'moti';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParams } from '../../navigation';

const PulseButton: React.FC<{ buttonText: string; onPress: () => void }> = ({
  buttonText,
  onPress,
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <Pressable
      style={styles.pulseButton}
      onPress={() => {
        setVisible(!visible);
        onPress();
      }}
    >
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
                style={{
                  position: 'absolute',
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'teal',
                }}
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

  return (
    <View style={styles.container}>
      <PulseButton buttonText="START" onPress={() => navigation.navigate('LoginScreen')} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.navigate('OnboadringScreen');
        }}
      >
        <Text style={styles.backButtonText}>&#8678; Back to info</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'teal',
    borderWidth: 10,
  },
  pulseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'teal',
    zIndex: 1,
  },
  pulseButtonText: {
    color: 'white',
    fontWeight: '700',
  },
  backButton: {
    marginTop: 150,
    backgroundColor: 'teal',
    padding: 20,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    zIndex: 0,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
