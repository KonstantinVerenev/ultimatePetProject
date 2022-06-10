import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  isLoading: boolean;
  darkTheme: boolean;
};

const initialState: AppState = {
  isLoading: false,
  darkTheme: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    enableLoading(state) {
      state.isLoading = true;
    },
    disableLoading(state) {
      state.isLoading = false;
    },
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const {
  enableLoading, // setIsLoadingTrue,
  disableLoading, // setIsLoadingFalse,
  toggleTheme,
} = appSlice.actions;

export default appSlice.reducer;
