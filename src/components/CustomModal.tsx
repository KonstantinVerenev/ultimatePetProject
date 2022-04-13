import { View, Text, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { CustomButton } from './CustomButton';
import { COLORS } from '../constants';

type CustomModalProps = {
  showScore: boolean;
  score: number;
  questionLenght: number;
  onPressRetry: () => void;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  showScore,
  score,
  questionLenght,
  onPressRetry,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showScore}>
      <View style={styles.modalContainer}>
        <View style={styles.scoreMessage}>
          <Text style={styles.scoreMessageText}>Your Score:</Text>
          <Text style={styles.scoreMessageText}>
            {score}/{questionLenght}
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
