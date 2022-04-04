import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  isLoading: boolean;
  darkTheme: boolean;
};

const initialState: AppState = {
  isLoading: false,
  darkTheme: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoadingTrue(state) {
      state.isLoading = true;
    },
    setIsLoadingFalse(state) {
      state.isLoading = false;
    },
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { setIsLoadingTrue, setIsLoadingFalse, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
