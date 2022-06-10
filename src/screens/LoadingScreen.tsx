import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../constants';
import { selectIsLoading } from '../store/selectors';

export const LoadingScreen: React.FC = () => {
  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size={'large'} color={'black'} style={styles.loadingIndicator} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.grey07,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
