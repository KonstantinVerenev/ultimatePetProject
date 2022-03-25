import React from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { AppNavigator } from './navigation';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
