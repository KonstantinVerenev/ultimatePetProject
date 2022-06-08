import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../constants';
import { RootState } from '../store';

type AnswerOptionProps = {
  option: string;
  validateAnswer: (selectedOptions: string) => void;
  correctOptions: string | null;
  currentOptionsSelected: string | null;
  isOptionsDisabled: boolean;
};

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  option,
  validateAnswer,
  correctOptions,
  currentOptionsSelected,
  isOptionsDisabled,
}) => {
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

  return (
    <TouchableOpacity
      style={[
        {
          ...styles.option,
          borderColor:
            option === correctOptions
              ? 'green'
              : option === currentOptionsSelected
              ? 'red'
              : '#8accf1',
        },
      ]}
      key={option}
      onPress={() => validateAnswer(option)}
      disabled={isOptionsDisabled}
    >
      <Text
        style={[
          {
            ...styles.optionText,
            color: darkTheme ? COLORS.dark.text : COLORS.light.text,
          },
        ]}
      >
        {option}
      </Text>
      {option === correctOptions && <Text style={styles.correctAnswer}>Correct</Text>}
      {option === currentOptionsSelected && option !== correctOptions && (
        <Text style={styles.wrongAnswer}>Wrong</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 3,
    borderColor: COLORS.buttonBackground,
    borderRadius: 20,
    padding: 15,
    backgroundColor: COLORS.accent,
  },
  optionText: {
    fontSize: 20,
  },
  wrongAnswer: {
    fontWeight: 'bold',
    backgroundColor: COLORS.red,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.red,
    overflow: 'hidden',
  },
  correctAnswer: {
    fontWeight: 'bold',
    backgroundColor: COLORS.green,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.green,
    overflow: 'hidden',
  },
});
