import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { COLORS } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';

type QuestionProps = {
  questionText: string;
};

export const Question: React.FC<QuestionProps> = ({ questionText }) => {
  const darkTheme = useDarkTheme();

  return (
    <Text
      style={[{ ...styles.questionText, color: darkTheme ? COLORS.dark.text : COLORS.light.text }]}
    >
      {questionText}
    </Text>
  );
};

const styles = StyleSheet.create({
  questionText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 26,
  },
});
