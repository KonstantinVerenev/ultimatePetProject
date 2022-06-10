import React, { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';

import { questions } from '../../data/quizData';
import {
  AnswerOption,
  AnswersProgressBar,
  AppScreen,
  CustomButton,
  Question,
  QuestionCounter,
  ScoreModal,
  TopBar,
} from '../../components';

export const HomeScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionsSelected, setCurrentOptionsSelected] = useState<string | null>(null);
  const [correctOptions, setCorrectOptions] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const validateAnswer = useCallback(
    (selectedOptions: string) => {
      setCurrentOptionsSelected(selectedOptions);

      const correctOption = questions[currentQuestionIndex]?.correctOption;
      setCorrectOptions(correctOption);
      setIsOptionsDisabled(true);
      setShowNextButton(true);
      if (selectedOptions === correctOption) {
        setScore(score + 1);
      }
    },
    [currentQuestionIndex, score]
  );

  const onPressNext = useCallback(() => {
    if (currentQuestionIndex === questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionsSelected(null);
      setCorrectOptions(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
  }, [currentQuestionIndex]);

  const onPressRetry = useCallback(() => {
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionsSelected(null);
    setCorrectOptions(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
  }, []);

  const onLogoutPress = useCallback(async () => {
    const firebaseAuth = await auth();
    await firebaseAuth.signOut();
  }, []);

  const answerOptions = questions[currentQuestionIndex]?.options.map((option) => {
    return (
      <AnswerOption
        option={option}
        key={option}
        validateAnswer={validateAnswer}
        correctOption={correctOptions}
        currentOptionsSelected={currentOptionsSelected}
        isOptionsDisabled={isOptionsDisabled}
      />
    );
  });

  return (
    <AppScreen>
      <TopBar onButtonPress={onLogoutPress} />
      <AnswersProgressBar
        questionLength={questions.length}
        currentQuestionIndex={currentQuestionIndex}
      />
      <QuestionCounter
        currentQuestionIndex={currentQuestionIndex}
        numberOfQuestions={questions.length}
      />
      <Question questionText={questions[currentQuestionIndex]?.question} />
      {answerOptions}
      {showNextButton && <CustomButton onPress={onPressNext} text={'NEXT'} />}
      <ScoreModal
        showScore={showScore}
        score={score}
        questionLenght={questions.length}
        onPressRetry={onPressRetry}
      />
    </AppScreen>
  );
};
