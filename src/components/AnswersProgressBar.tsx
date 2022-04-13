import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '../constants';

type AnswersProgressBarProps = {
  questionLength: number;
  currentQuestionIndex: number;
};

export const AnswersProgressBar: React.FC<AnswersProgressBarProps> = ({
  questionLength,
  currentQuestionIndex,
}) => {
  const progress = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const widthAnim = interpolate(progress.value, [0, questionLength], [0, 100]);

    return { width: `${widthAnim}%` };
  });

  useEffect(() => {
    progress.value = withTiming(currentQuestionIndex, {
      duration: 500,
      easing: Easing.ease,
    });
    console.log('effect');
  }, [currentQuestionIndex, progress]);

  return (
    <View style={styles.barArea}>
      <Animated.View style={[styles.barFill, animatedStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  barArea: {
    marginHorizontal: 10,
    marginTop: 25,
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: COLORS.buttonBackground,
  },
});
