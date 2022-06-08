import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { COLORS } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';

type QuestionCounterProps = {
  currentQuestionIndex: number;
  numberOfQuestions: number;
};

export const QuestionCounter: React.FC<QuestionCounterProps> = ({
  currentQuestionIndex,
  numberOfQuestions,
}) => {
  const darkTheme = useDarkTheme();

  return (
    <Text
      style={[{ ...styles.counterText, color: darkTheme ? COLORS.dark.text : COLORS.light.text }]}
    >
      {currentQuestionIndex + 1} / {numberOfQuestions}
    </Text>
  );
};

const styles = StyleSheet.create({
  counterText: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 30,
  },
});
