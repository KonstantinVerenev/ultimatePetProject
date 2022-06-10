import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { COLORS, THEME_COLORS } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';

type QuestionProps = {
  questionText: string;
};

export const Question: React.FC<QuestionProps> = ({ questionText }) => {
  const darkTheme = useDarkTheme();

  return (
    <Text
      style={[
        {
          ...styles.questionText,
          color: darkTheme ? THEME_COLORS.dark.text : THEME_COLORS.light.text,
        },
      ]}
    >
      {questionText}
    </Text>
  );
};

const styles = StyleSheet.create({
  questionText: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 26,
  },
});
