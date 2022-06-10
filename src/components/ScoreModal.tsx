import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import { CustomButton } from './CustomButton';
import { COLORS, THEME_COLORS } from '../constants';

type ScoreModalProps = {
  showScore: boolean;
  score: number;
  questionLenght: number;
  onPressRetry: () => void;
};

export const ScoreModal: React.FC<ScoreModalProps> = ({
  showScore,
  score,
  questionLenght,
  onPressRetry,
}) => {
  const scorePoints = `${score} of ${questionLenght}`;
  const scorePercentages = Math.floor((score / questionLenght) * 100);

  return (
    <Modal animationType="slide" transparent={true} visible={showScore}>
      <View style={styles.modalContainer}>
        <View style={styles.scoreMessage}>
          <Text style={styles.scoreMessageText}>
            Your Score:{'\n'}
            {scorePoints} ({scorePercentages}%)
          </Text>
          <CustomButton onPress={onPressRetry} text={'Retry Quiz'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.dark.background,
  },
  scoreMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 50,
    backgroundColor: THEME_COLORS.light.background,
  },
  scoreMessageText: {
    marginVertical: 5,
    fontSize: 24,
    color: THEME_COLORS.light.text,
  },
});
