import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { COLORS } from '../../constants';
import { TopBar } from '../../components/TopBar';
import { quizData } from '../../data/quizData';
import { CustomButton } from '../../components/CustomButton';
import { CustomModal } from '../../components/CustomModal';
import { BackgroundImage } from '../../components/BackgroundImage';
import { AnswersProgressBar } from '../../components/AnswersProgressBar';

export const HomeScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionsSelected, setCurrentOptionsSelected] = useState<string | null>(null);
  const [correctOptions, setCorrectOptions] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);
  const question = quizData;

  const validateAnswer = (selectedOptions: string) => {
    setCurrentOptionsSelected(selectedOptions);

    const correctOption = question[currentQuestionIndex]?.correct_option;
    setCorrectOptions(correctOption);

    setIsOptionsDisabled(true);

    if (selectedOptions === correctOption) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };

  const onPressNext = () => {
    if (currentQuestionIndex === question.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionsSelected(null);
      setCorrectOptions(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
  };

  const onPressRetry = () => {
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionsSelected(null);
    setCorrectOptions(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
  };

  const answerOptions = (
    <View>
      {question[currentQuestionIndex]?.options.map((option) => {
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
      })}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        {
          ...styles.container,
          backgroundColor: darkTheme ? COLORS.dark.background : COLORS.light.background,
        },
      ]}
    >
      <StatusBar barStyle={darkTheme ? 'light-content' : 'dark-content'} />

      <TopBar />

      {/*Progress Bar*/}
      <AnswersProgressBar
        questionLength={question.length}
        currentQuestionIndex={currentQuestionIndex}
      />

      <View style={styles.wrapper}>
        {/* Counter */}
        <Text
          style={[
            { ...styles.counterText, color: darkTheme ? COLORS.dark.text : COLORS.light.text },
          ]}
        >
          {currentQuestionIndex + 1} / {question.length}
        </Text>

        {/* Question */}
        <Text
          style={[
            { ...styles.questionText, color: darkTheme ? COLORS.dark.text : COLORS.light.text },
          ]}
        >
          {question[currentQuestionIndex]?.question}
        </Text>

        {/* Options */}
        {answerOptions}
      </View>

      {/* Next button */}
      {showNextButton && <CustomButton onPress={onPressNext} text={'NEXT'} />}

      {/* Score modal */}
      <CustomModal
        showScore={showScore}
        score={score}
        questionLenght={question.length}
        onPressRetry={onPressRetry}
      />

      <BackgroundImage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    margin: 20,
  },
  counterText: {
    fontSize: 30,
  },
  questionText: {
    marginTop: 20,
    fontSize: 26,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
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
