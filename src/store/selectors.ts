import { RootState } from '.';

export const selectEmail = (state: RootState) => state.user.email;
export const selectDarkTheme = (state: RootState) => state.app.darkTheme;
export const selectIsLoggedIn = (state: RootState) => !!state.user.email;
export const selectIsLoading = (state: RootState) => state.app.isLoading;
