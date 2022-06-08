import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../constants';
import { RootState } from '../store';

type QuestionProps = {
  questionText: string;
};

export const Question: React.FC<QuestionProps> = ({ questionText }) => {
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

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
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 26,
  },
});
