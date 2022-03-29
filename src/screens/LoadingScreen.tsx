import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator size={'large'} color={'black'} style={styles.loadingIndicator} />
    </View>
  );
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
