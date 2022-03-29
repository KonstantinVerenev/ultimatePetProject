import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  isLoading: boolean;
};

const initialState: AppState = {
  isLoading: false,
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
  },
});

export const { setIsLoadingTrue, setIsLoadingFalse } = appSlice.actions;

export default appSlice.reducer;
