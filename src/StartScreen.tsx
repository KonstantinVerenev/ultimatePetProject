import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';

export const StartButton: React.FC<{ buttonText: string }> = ({ buttonText }) => {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setVisible(!visible);
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
                  exit={{ opacity: 0.5, scale: 1 }}
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
        <Text>{buttonText}</Text>
      </Pressable>
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'teal',
  },
});
