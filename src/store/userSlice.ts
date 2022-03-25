import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  email: string | null;
  token: string | null;
  id: string | null;
};

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, token, id } = action.payload;

      state.email = email;
      state.token = token;
      state.id = id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
