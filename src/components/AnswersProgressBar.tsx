import { View, Animated } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants';

type AnswersProgressBarProps = {
  questionLength: number;
  currentQuestionIndex: number;
};

export const AnswersProgressBar: React.FC<AnswersProgressBarProps> = ({
  questionLength,
  currentQuestionIndex,
}) => {
  const [progress] = useState(new Animated.Value(0));

  Animated.timing(progress, {
    toValue: currentQuestionIndex,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  const progressAnim = progress.interpolate({
    inputRange: [0, questionLength],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 25,
        height: 20,
        borderRadius: 20,
        backgroundColor: COLORS.accent,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            borderRadius: 20,
            backgroundColor: COLORS.buttonBackground,
          },
          { width: progressAnim },
        ]}
      />
    </View>
  );
};
