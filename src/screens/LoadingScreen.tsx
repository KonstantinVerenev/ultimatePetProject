import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const LoadingScreen: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

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
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
