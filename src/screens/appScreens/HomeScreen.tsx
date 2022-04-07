import React, { useState } from 'react';
import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { COLORS } from '../../constants';
import { TopBar } from '../../components/TopBar';
import { quizData } from '../../data/quizData';
import { CustomButton } from '../../components/CustomButton';

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
    const correctOption = question[currentQuestionIndex]?.correct_option;
    setCurrentOptionsSelected(selectedOptions);
    setCorrectOptions(correctOption);
    setIsOptionsDisabled(true);

    if (selectedOptions === correctOption) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };

  const nextHandler = () => {
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

  const retryHandler = () => {
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionsSelected(null);
    setCorrectOptions(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
  };

  return (
    <SafeAreaView
      style={[
        {
          ...styles.container,
          backgroundColor: darkTheme ? COLORS.dark.background : COLORS.light.background,
        },
      ]}
    >
      <TopBar />

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
                        : 'lightblue',
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
                {option === correctOptions && <Text style={{ color: 'green' }}>Correct</Text>}
                {option === currentOptionsSelected && option !== correctOptions && (
                  <Text style={{ color: 'red' }}>Wrong</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Next button */}
      {showNextButton && <CustomButton onPress={nextHandler} text={'NEXT'} />}

      {/* Score modal */}
      <Modal animationType="slide" transparent={true} visible={showScore}>
        <View style={styles.modalContainer}>
          <View style={styles.scoreMessage}>
            <Text style={styles.scoreMessageText}>Your Score:</Text>
            <Text style={styles.scoreMessageText}>
              {score}/{question.length}
            </Text>

            <CustomButton onPress={retryHandler} text={'Retry Quiz'} />
          </View>
        </View>
      </Modal>

      <Image
        source={require('../../../assets/DottedBG.png')}
        style={{
          alignSelf: 'flex-end',
          width: '60%',
          height: '95%',
          position: 'absolute',
          bottom: 0,
          zIndex: -1,
          resizeMode: 'contain',
          opacity: 0.5,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    margin: 20,
  },
  counterText: {
    fontSize: 30,
  },
  questionText: {
    marginTop: 20,
    fontSize: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 3,
    borderColor: COLORS.dark.buttonBackground,
    borderRadius: 20,
    padding: 15,
    backgroundColor: COLORS.dark.accent,
  },
  optionText: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.background,
  },
  scoreMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.light.background,
  },
  scoreMessageText: {
    marginVertical: 5,
    fontSize: 24,
  },
});
