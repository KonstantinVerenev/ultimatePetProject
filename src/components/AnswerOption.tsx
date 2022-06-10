import React, { useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS, THEME_COLORS } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';

type AnswerOptionProps = {
  option: string;
  validateAnswer: (selectedOptions: string) => void;
  correctOption: string | null;
  currentOptionsSelected: string | null;
  isOptionsDisabled: boolean;
};

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  option,
  validateAnswer,
  correctOption: correctOptions,
  currentOptionsSelected,
  isOptionsDisabled,
}) => {
  const darkTheme = useDarkTheme();
  const isOptionCorrert = option === correctOptions;
  const isOptionsSelected = option === currentOptionsSelected;

  const onPressAnswer = useCallback(() => validateAnswer(option), [option, validateAnswer]);

  return (
    <TouchableOpacity
      style={[
        {
          ...styles.option,
          borderColor: isOptionCorrert
            ? COLORS.green
            : isOptionsSelected
            ? COLORS.red
            : COLORS.buttonBackground,
        },
      ]}
      key={option}
      onPress={onPressAnswer}
      disabled={isOptionsDisabled}
    >
      <Text
        style={[
          {
            ...styles.optionText,
            color: darkTheme ? THEME_COLORS.dark.text : THEME_COLORS.light.text,
          },
        ]}
      >
        {option}
      </Text>
      {isOptionCorrert && <Text style={[styles.answer, styles.correctAnswer]}>Correct</Text>}
      {isOptionsSelected && !isOptionCorrert && (
        <Text style={[styles.answer, styles.wrongAnswer]}>Wrong</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 15,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: COLORS.buttonBackground,
    backgroundColor: COLORS.accent,
  },
  optionText: {
    fontSize: 20,
  },
  answer: {
    padding: 2,
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: 'bold',
    color: THEME_COLORS.light.text,
  },
  wrongAnswer: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.red,
  },
  correctAnswer: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
  },
});
