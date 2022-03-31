import React from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { AppNavigator } from './navigation';
import { store } from './store';
import { LoadingScreen } from './screens/LoadingScreen';

export const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <LoadingScreen />
    </Provider>
  );
};
