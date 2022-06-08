import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';

import { RootState } from '../store';

type QuestionCounterProps = {
  currentQuestionIndex: number;
  numberOfQuestions: number;
};

export const QuestionCounter: React.FC<QuestionCounterProps> = ({
  currentQuestionIndex,
  numberOfQuestions,
}) => {
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

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
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 30,
  },
});
