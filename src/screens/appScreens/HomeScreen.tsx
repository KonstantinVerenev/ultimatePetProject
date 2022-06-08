import React, { useState } from 'react';

import { TopBar } from '../../components/TopBar';
import { questions } from '../../data/quizData';
import { CustomButton } from '../../components/CustomButton';
import { CustomModal } from '../../components/CustomModal';
import { BackgroundImage } from '../../components/BackgroundImage';
import { AnswersProgressBar } from '../../components/AnswersProgressBar';
import { AnswerOption } from '../../components/AnswerOption';
import { QuestionCounter } from '../../components/QuestionCounter';
import { Question } from '../../components/Question';
import { AppScreen } from '../../components/AppScreen';

export const HomeScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionsSelected, setCurrentOptionsSelected] = useState<string | null>(null);
  const [correctOptions, setCorrectOptions] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const validateAnswer = (selectedOptions: string) => {
    setCurrentOptionsSelected(selectedOptions);

    const correctOption = questions[currentQuestionIndex]?.correct_option;
    setCorrectOptions(correctOption);
    setIsOptionsDisabled(true);
    setShowNextButton(true);
    if (selectedOptions === correctOption) {
      setScore(score + 1);
    }
  };

  const onPressNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
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
    <>
      {questions[currentQuestionIndex]?.options.map((option) => {
        return (
          <AnswerOption
            option={option}
            key={option}
            validateAnswer={validateAnswer}
            correctOptions={correctOptions}
            currentOptionsSelected={currentOptionsSelected}
            isOptionsDisabled={isOptionsDisabled}
          />
        );
      })}
    </>
  );

  return (
    <AppScreen>
      <TopBar />
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
      <CustomModal
        showScore={showScore}
        score={score}
        questionLenght={questions.length}
        onPressRetry={onPressRetry}
      />
    </AppScreen>
  );
};
