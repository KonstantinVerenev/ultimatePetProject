import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { COLORS, THEME_COLORS } from '../constants';
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

  const counterValue = `${currentQuestionIndex + 1}/${numberOfQuestions}`;

  return (
    <Text
      style={[
        {
          ...styles.counterText,
          color: darkTheme ? THEME_COLORS.dark.text : THEME_COLORS.light.text,
        },
      ]}
    >
      {counterValue}
    </Text>
  );
};

const styles = StyleSheet.create({
  counterText: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 30,
  },
});
